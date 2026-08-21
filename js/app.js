// --- FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyCxvKi6pqM7bFv8s8Xj5Q5BzP_p1By-pAw",
  authDomain: "appupplower.firebaseapp.com",
  projectId: "appupplower",
  storageBucket: "appupplower.firebasestorage.app",
  messagingSenderId: "408829264926",
  appId: "1:408829264926:web:64b61260f4f16676edda0f"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- STATE MANAGEMENT ---
let currentUser = null;
let memory = {}; 
let activeWorkout = null;
let currentExerciseIndex = 0;
let currentSet = 0;
let timerInterval = null;

// --- DOM ELEMENTS ---
const viewLogin = document.getElementById('view-login');
const viewHome = document.getElementById('view-home');
const viewWorkout = document.getElementById('view-workout');

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
    
    // Auth Listeners
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('btn-logout').addEventListener('click', handleLogout);
    
    // Workout Listeners
    document.getElementById('btn-back-home').addEventListener('click', () => switchView(viewHome));
    document.getElementById('btn-next-set').addEventListener('click', handleNextSet);
    document.getElementById('btn-skip-timer').addEventListener('click', () => skipTimer(false));
    document.getElementById('btn-finish-workout').addEventListener('click', showCompletionModal);

    
});

// --- AUTHENTICATION ---
async function checkLogin() {
    const savedUser = localStorage.getItem('gymApp_user');
    if (savedUser) {
        currentUser = savedUser;
        await loadMemory();
        renderHome();
        switchView(viewHome);
    } else {
        switchView(viewLogin);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim().toLowerCase();
    if (username) {
        currentUser = username;
        localStorage.setItem('gymApp_user', currentUser);
        
        const btn = document.querySelector('#login-form button');
        const oldText = btn.textContent;
        btn.textContent = 'Buscando Nuvem...';
        btn.disabled = true;

        await loadMemory();

        btn.textContent = oldText;
        btn.disabled = false;
        
        renderHome();
        switchView(viewHome);
    }
}

function handleLogout() {
    currentUser = null;
    memory = {};
    localStorage.removeItem('gymApp_user');
    switchView(viewLogin);
}

// --- MEMORY / DATABASE ---
async function loadMemory() {
    try {
        const docRef = db.collection('users').doc(currentUser);
        const docSnap = await docRef.get();
        if (docSnap.exists) {
            memory = docSnap.data();
        } else {
            memory = {};
        }
    } catch (e) {
        console.error("Firebase load error, fallback to local", e);
        const data = localStorage.getItem(`gymApp_memory_${currentUser}`);
        if (data) memory = JSON.parse(data);
    }
}

async function saveMemory() {
    // Salva localmente como backup e em seguida envia para a nuvem
    localStorage.setItem(`gymApp_memory_${currentUser}`, JSON.stringify(memory));
    try {
        await db.collection('users').doc(currentUser).set(memory);
    } catch (e) {
        console.error("Firebase save error", e);
    }
}

// --- UI NAVIGATION ---
function switchView(viewElement) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    viewElement.classList.add('active');
}

// --- HOME / DASHBOARD ---
function renderHome() {
    document.getElementById('user-display-name').textContent = currentUser;
    
    const today = new Date();
    const currentDay = today.getDay();
    const localDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000));
    const dateString = localDate.toISOString().split('T')[0];

    // Render Week Progress
    const daysContainer = document.getElementById('days-container');
    daysContainer.innerHTML = '';
    
    // Order from Monday (1) to Sunday (0)
    const orderedSchedule = [...WEEK_SCHEDULE.filter(d => d.dayId !== 0), WEEK_SCHEDULE.find(d => d.dayId === 0)];
    
    orderedSchedule.forEach(day => {
        const isToday = day.dayId === currentDay;
        
        const circle = document.createElement('div');
        circle.className = `day-circle ${isToday ? 'active' : ''}`;
        
        circle.innerHTML = `
            ${day.name}
            <span>${day.workout !== 'rest' ? day.workout.replace(/[0-9]/g, '').toUpperCase() : '-'}</span>
        `;
        daysContainer.appendChild(circle);
    });

    // Render Today Workout Card
    const todaySchedule = WEEK_SCHEDULE.find(d => d.dayId === currentDay);
    const workoutContainer = document.getElementById('today-workout-container');
    
    if (todaySchedule.workout === 'rest') {
        workoutContainer.innerHTML = `
            <div class="glass-card" style="text-align:center; padding: 40px 20px;">
                <h3>Dia de Descanso</h3>
                <p style="color:var(--text-muted); margin-top:10px;">Aproveite para recuperar os m√∫sculos.</p>
            </div>
        `;
    } else if (memory[dateString]) {
        workoutContainer.innerHTML = `
            <div class="glass-card" style="text-align:center; padding: 40px 20px; border-color: var(--success);">
                <h3><i class="fa-solid fa-check-circle" style="color:var(--success)"></i> Treino Conclu√≠do</h3>
                <p style="color:var(--text-muted); margin-top:10px;">Voc√™ j√° treinou hoje. Bom trabalho!</p>
            </div>
        `;
        // Mark today circle as completed
        document.querySelector('.day-circle.active')?.classList.add('completed');
    } else {
        const workout = WORKOUT_DATA[todaySchedule.workout];
        workoutContainer.innerHTML = `
            <div class="workout-card" onclick="startWorkout('${workout.id}')">
                <img src="${workout.image}" alt="${workout.name}">
                <div class="workout-card-info">
                    <h4>${workout.name}</h4>
                    <p>${workout.exercises.length} Exerc√≠cios</p>
                </div>
            </div>
        `;
    }

    // Modo Admin: Exibir todos os treinos
    const adminPanel = document.getElementById('admin-panel');
    const adminContainer = document.getElementById('admin-workouts-container');
    
    if (currentUser.toLowerCase() === 'admin' || currentUser.toLowerCase() === 'administrador') {
        adminPanel.style.display = 'block';
        adminContainer.innerHTML = '';
        
        Object.values(WORKOUT_DATA).forEach(workout => {
            adminContainer.innerHTML += `
                <div class="workout-card" onclick="startWorkout('${workout.id}')" style="border-color: var(--secondary);">
                    <img src="${workout.image}" alt="${workout.name}">
                    <div class="workout-card-info">
                        <h4>${workout.name}</h4>
                        <p>${workout.exercises.length} Exerc√≠cios</p>
                    </div>
                </div>
            `;
        });
    } else {
        adminPanel.style.display = 'none';
    }
}

// --- WORKOUT EXECUTION ---
window.exerciseStates = [];

window.startWorkout = function(workoutId) {
    activeWorkout = WORKOUT_DATA[workoutId];
    currentExerciseIndex = 0;
    
    // Inicializa o estado de cada exercicio (serie atual 0)
    window.exerciseStates = activeWorkout.exercises.map(() => 0);
    
    // Progress Bar Logic (5 series por exercicio)
    window.totalWorkoutSets = activeWorkout.exercises.length * 5;
    window.completedWorkoutSets = 0;
    updateProgressBar();
    
    document.getElementById('workout-title').textContent = activeWorkout.name;
    switchView(viewWorkout);
    renderExercise();
}

function updateProgressBar() {
    window.completedWorkoutSets = window.exerciseStates.reduce((acc, curr) => acc + curr, 0);
    const percentage = (window.completedWorkoutSets / window.totalWorkoutSets) * 100;
    document.getElementById('workout-progress-bar').style.width = ${percentage}%;
}

function renderExercise() {
    const exercise = activeWorkout.exercises[currentExerciseIndex];
    const totalSets = 5;
    currentSet = window.exerciseStates[currentExerciseIndex];
    
    document.getElementById('exercise-name').textContent = exercise.name;
    document.getElementById('exercise-sets').textContent = '2x Aquecimento + 3x Carga M·xima';
    
    document.getElementById('exercise-image').src = exercise.image || activeWorkout.image;
    
    // Load inputs
    if (!memory.weights) memory.weights = {};
    if (!memory.weights_warmup) memory.weights_warmup = {};
    if (!memory.bench_heights) memory.bench_heights = {};
    if (!memory.bench_enabled) memory.bench_enabled = {};

    const warmupInput = document.getElementById('warmup-weight');
    const weightInput = document.getElementById('exercise-weight');
    
    warmupInput.value = memory.weights_warmup[exercise.name] || '';
    weightInput.value = memory.weights[exercise.name] || '';
    
    warmupInput.onchange = (e) => { memory.weights_warmup[exercise.name] = e.target.value; saveMemory(); };
    weightInput.onchange = (e) => { memory.weights[exercise.name] = e.target.value; saveMemory(); };

    const benchCheck = document.getElementById('enable-bench');
    const benchContainer = document.getElementById('bench-height-container');
    const benchInput = document.getElementById('bench-height');

    benchCheck.checked = memory.bench_enabled[exercise.name] || false;
    benchContainer.style.display = benchCheck.checked ? 'flex' : 'none';
    benchInput.value = memory.bench_heights[exercise.name] || '';

    benchCheck.onchange = (e) => {
        memory.bench_enabled[exercise.name] = e.target.checked;
        benchContainer.style.display = e.target.checked ? 'flex' : 'none';
        saveMemory();
    };
    benchInput.onchange = (e) => { memory.bench_heights[exercise.name] = e.target.value; saveMemory(); };
    
    renderSetsTracker();
    hideTimer();
    
    const btnSet = document.getElementById('btn-next-set');
    const btnFinish = document.getElementById('btn-finish-workout');
    
    if (currentSet >= totalSets) {
        btnSet.textContent = 'ConcluÌdo';
        btnSet.style.opacity = '0.5';
    } else {
        btnSet.textContent = 'Completar SÈrie';
        btnSet.style.opacity = '1';
    }
    btnSet.style.display = 'block';

    if (currentExerciseIndex === activeWorkout.exercises.length - 1) {
        btnFinish.style.display = 'block';
    } else {
        btnFinish.style.display = 'none';
    }
}

function renderSetsTracker() {
    const tracker = document.getElementById('sets-tracker');
    tracker.innerHTML = '';
    for(let i=0; i<5; i++) {
        const bubble = document.createElement('div');
        let classNames = 'set-bubble';
        if (i < 2) classNames += ' warmup';
        if (i < currentSet) classNames += ' done';
        bubble.className = classNames;
        bubble.textContent = i + 1;
        tracker.appendChild(bubble);
    }
}

function handleNextSet() {
    if (currentSet >= 5) return;
    
    currentSet++;
    window.exerciseStates[currentExerciseIndex] = currentSet;
    updateProgressBar();
    renderSetsTracker();
    
    if (currentSet < 5) {
        startRestTimer(60, false);
    } else {
        const btnSet = document.getElementById('btn-next-set');
        btnSet.textContent = 'ConcluÌdo';
        btnSet.style.opacity = '0.5';
    }
}

function startRestTimer(seconds, autoNext) {
    if(seconds <= 0) return;
    
    document.getElementById('btn-next-set').style.display = 'none'; 
    document.getElementById('timer-container').style.display = 'flex';
    
    let remaining = seconds;
    updateTimerDisplay(remaining);
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
            clearInterval(timerInterval);
            hideTimer();
            document.getElementById('btn-next-set').style.display = 'block';
            if(autoNext && window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate([200, 100, 200]);
            }
        } else {
            updateTimerDisplay(remaining);
        }
    }, 1000);
}

function skipTimer() {
    clearInterval(timerInterval);
    hideTimer();
    document.getElementById('btn-next-set').style.display = 'block';
}

function hideTimer() {
    document.getElementById('timer-container').style.display = 'none';
}

function updateTimerDisplay(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    document.getElementById('timer-display').textContent = ${m}:${s};
}

function showCompletionModal() {
    const today = new Date();
    const localDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000));
    const dateString = localDate.toISOString().split('T')[0];
    
    memory[dateString] = activeWorkout.id;
    saveMemory();
    
    document.getElementById('completion-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('completion-modal').classList.remove('active');
    renderHome();
    switchView(viewHome);
}

// Global Nav Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-prev-exercise').addEventListener('click', () => {
        if (currentExerciseIndex > 0) {
            currentExerciseIndex--;
            renderExercise();
        }
    });

    document.getElementById('btn-next-exercise').addEventListener('click', () => {
        if (currentExerciseIndex < activeWorkout?.exercises.length - 1) {
            currentExerciseIndex++;
            renderExercise();
        }
    });
});

