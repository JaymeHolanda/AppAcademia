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
    document.getElementById('btn-finish-workout').addEventListener('click', finishWorkout);

    const phonkPlayer = document.getElementById('phonk-player');
    document.querySelectorAll('.phonk-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            if (phonkPlayer.paused) {
                phonkPlayer.play();
                document.querySelectorAll('.phonk-toggle').forEach(b => b.classList.add('playing'));
            } else {
                phonkPlayer.pause();
                document.querySelectorAll('.phonk-toggle').forEach(b => b.classList.remove('playing'));
            }
        });
    });
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
                <p style="color:var(--text-muted); margin-top:10px;">Aproveite para recuperar os músculos.</p>
            </div>
        `;
    } else if (memory[dateString]) {
        workoutContainer.innerHTML = `
            <div class="glass-card" style="text-align:center; padding: 40px 20px; border-color: var(--success);">
                <h3><i class="fa-solid fa-check-circle" style="color:var(--success)"></i> Treino Concluído</h3>
                <p style="color:var(--text-muted); margin-top:10px;">Você já treinou hoje. Bom trabalho!</p>
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
                    <p>${workout.exercises.length} Exercícios</p>
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
                        <p>${workout.exercises.length} Exercícios</p>
                    </div>
                </div>
            `;
        });
    } else {
        adminPanel.style.display = 'none';
    }
}

// --- WORKOUT EXECUTION ---
// Needed to expose for onclick from HTML string
window.startWorkout = function(workoutId) {
    activeWorkout = WORKOUT_DATA[workoutId];
    currentExerciseIndex = 0;
    currentSet = 0;
    
    // Progress Bar Logic
    window.totalWorkoutSets = activeWorkout.exercises.reduce((total, ex) => total + ex.sets, 0);
    window.completedWorkoutSets = 0;
    updateProgressBar();
    
    document.getElementById('workout-title').textContent = activeWorkout.name;
    switchView(viewWorkout);
    renderExercise();
}

function updateProgressBar() {
    const percentage = (window.completedWorkoutSets / window.totalWorkoutSets) * 100;
    document.getElementById('workout-progress-bar').style.width = `${percentage}%`;
}

function renderExercise() {
    const exercise = activeWorkout.exercises[currentExerciseIndex];
    document.getElementById('exercise-name').textContent = exercise.name;
    document.getElementById('exercise-sets').textContent = `${exercise.sets} x ${exercise.reps}`;
    
    document.getElementById('exercise-image').src = exercise.image || activeWorkout.image;
    
    // Load and save weight logic
    const weightInput = document.getElementById('exercise-weight');
    if (!memory.weights) memory.weights = {};
    weightInput.value = memory.weights[exercise.name] || '';
    
    weightInput.onchange = (e) => {
        memory.weights[exercise.name] = e.target.value;
        saveMemory();
    };
    
    renderSetsTracker(exercise.sets);
    hideTimer();
    
    const btn = document.getElementById('btn-next-set');
    btn.textContent = 'Completar Série';
    btn.style.display = 'block';
}

function renderSetsTracker(totalSets) {
    const tracker = document.getElementById('sets-tracker');
    tracker.innerHTML = '';
    for(let i=0; i<totalSets; i++) {
        const bubble = document.createElement('div');
        bubble.className = `set-bubble ${i < currentSet ? 'done' : ''}`;
        bubble.textContent = i + 1;
        tracker.appendChild(bubble);
    }
}

function handleNextSet() {
    const exercise = activeWorkout.exercises[currentExerciseIndex];
    currentSet++;
    window.completedWorkoutSets++;
    updateProgressBar();
    
    renderSetsTracker(exercise.sets);
    
    if (currentSet >= exercise.sets) {
        currentExerciseIndex++;
        if (currentExerciseIndex >= activeWorkout.exercises.length) {
            showCompletionModal();
        } else {
            currentSet = 0;
            startRestTimer(exercise.rest, true); 
        }
    } else {
        startRestTimer(exercise.rest, false);
    }
}

function startRestTimer(seconds, nextExercise) {
    if(seconds <= 0) {
        if(nextExercise) renderExercise();
        return;
    }

    const btn = document.getElementById('btn-next-set');
    btn.style.display = 'none'; 
    
    const timerContainer = document.getElementById('timer-container');
    timerContainer.style.display = 'flex';
    
    let remaining = seconds;
    updateTimerDisplay(remaining);
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        remaining--;
        updateTimerDisplay(remaining);
        
        if(remaining <= 0) {
            skipTimer(nextExercise);
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    document.getElementById('timer-display').textContent = `${m}:${s}`;
}

function skipTimer(isNextExercise) {
    clearInterval(timerInterval);
    hideTimer();
    
    if (currentSet === 0 && currentExerciseIndex > 0) {
        renderExercise();
    } else {
        document.getElementById('btn-next-set').style.display = 'block';
    }
}

function hideTimer() {
    document.getElementById('timer-container').style.display = 'none';
}

function showCompletionModal() {
    const today = new Date();
    const localDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000));
    const dateString = localDate.toISOString().split('T')[0];
    
    memory[dateString] = activeWorkout.id;
    saveMemory();
    
    document.getElementById('completion-modal').classList.add('active');
}

function finishWorkout() {
    document.getElementById('completion-modal').classList.remove('active');
    renderHome();
    switchView(viewHome);
}

