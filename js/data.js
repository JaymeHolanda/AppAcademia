const WORKOUT_DATA = {
    upper1: {
        id: 'upper1',
        name: 'Upper Body 1',
        image: 'assets/upper_body.jpg',
        exercises: [
            { name: 'Supino Inclinado Máquina', sets: 4, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leverage_Incline_Chest_Press/0.jpg' },
            { name: 'Voador', sets: 4, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butterfly/0.jpg' },
            { name: 'Remada Máquina', sets: 4, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leverage_Iso_Row/0.jpg' },
            { name: 'Pulley Aberto', sets: 4, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Front_Lat_Pulldown/0.jpg' },
            { name: 'Desenvolvimento com Halteres', sets: 3, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shoulder_Press/0.jpg' },
            { name: 'Rosca Scott', sets: 3, reps: '10-12', rest: 45, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Preacher_Curl/0.jpg' },
            { name: 'Tríceps Corda', sets: 3, reps: '10-12', rest: 45, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Grip_Triceps_Pushdown/0.jpg' }
        ]
    },
    lower1: {
        id: 'lower1',
        name: 'Lower Body 1',
        image: 'assets/lower_body.jpg',
        exercises: [
            { name: 'Flexor Sentado', sets: 4, reps: '10-15', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Leg_Curl/0.jpg' },
            { name: 'Hack Machine', sets: 4, reps: '10-12', rest: 90, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hack_Squat/0.jpg' },
            { name: 'Leg Press', sets: 4, reps: '10-12', rest: 90, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/0.jpg' },
            { name: 'Adutor', sets: 3, reps: '12-15', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Thigh_Adductor/0.jpg' },
            { name: 'Leg Press 45° (Pés Altos)', sets: 4, reps: '10-12', rest: 90, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Narrow_Stance_Leg_Press/0.jpg' }
        ]
    },
    upper2: {
        id: 'upper2',
        name: 'Upper Body 2',
        image: 'assets/upper_body.jpg',
        exercises: [
            { name: 'Supino Reto Máquina', sets: 4, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leverage_Chest_Press/0.jpg' },
            { name: 'Remada Máquina Fechada', sets: 4, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Elevated_Cable_Rows/0.jpg' },
            { name: 'Crucifixo com Halteres (Banco Inclinado)', sets: 4, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Flyes/0.jpg' },
            { name: 'Pulley Triângulo', sets: 4, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/V-Bar_Pulldown/0.jpg' },
            { name: 'Elevação Lateral com Halteres', sets: 4, reps: '12-15', rest: 45, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/0.jpg' },
            { name: 'Rosca Direta Cabo', sets: 3, reps: '10-12', rest: 45, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Biceps_Cable_Curl/0.jpg' },
            { name: 'Tríceps Francês', sets: 3, reps: '10-12', rest: 45, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Triceps_Press/0.jpg' }
        ]
    },
    lower2: {
        id: 'lower2',
        name: 'Lower Body 2',
        image: 'assets/lower_body.jpg',
        exercises: [
            { name: 'Elevação Pélvica', sets: 4, reps: '10-15', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/0.jpg' },
            { name: 'Flexor Deitado', sets: 4, reps: '10-15', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Leg_Curls/0.jpg' },
            { name: 'Extensor', sets: 4, reps: '10-15', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/0.jpg' },
            { name: 'Stiff', sets: 4, reps: '10-12', rest: 90, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stiff_Leg_Barbell_Good_Morning/0.jpg' },
            { name: 'Abdutor', sets: 3, reps: '12-15', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Thigh_Abductor/0.jpg' }
        ]
    },
    cardio: {
        id: 'cardio',
        name: 'Cardio',
        image: 'assets/cardio.jpg',
        exercises: [
            { name: 'Esteira, Bike ou Elíptico', sets: 1, reps: '45-60 min', rest: 0 }
        ]
    }
};

const WEEK_SCHEDULE = [
    { dayId: 1, name: 'Seg', workout: 'upper1', fullWorkoutName: 'Upper 1' },
    { dayId: 2, name: 'Ter', workout: 'lower1', fullWorkoutName: 'Lower 1' },
    { dayId: 3, name: 'Qua', workout: 'cardio', fullWorkoutName: 'Cardio' },
    { dayId: 4, name: 'Qui', workout: 'upper2', fullWorkoutName: 'Upper 2' },
    { dayId: 5, name: 'Sex', workout: 'lower2', fullWorkoutName: 'Lower 2' },
    { dayId: 6, name: 'Sáb', workout: 'rest', fullWorkoutName: 'Descanso' },
    { dayId: 0, name: 'Dom', workout: 'rest', fullWorkoutName: 'Descanso' }
];
