const WORKOUT_DATA = {
    upper1: {
        id: 'upper1',
        name: 'Upper Body 1',
        image: 'assets/upper_body.jpg',
        exercises: [
            { name: 'Supino Inclinado Máquina', sets: 5, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leverage_Incline_Chest_Press/0.jpg' },
            { name: 'Remada Máquina', sets: 5, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leverage_Iso_Row/0.jpg' },
            { name: 'Voador', sets: 5, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butterfly/0.jpg' },
            { name: 'Pulley Aberto', sets: 5, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Front_Lat_Pulldown/0.jpg' },
            { name: 'Elevação Lateral na Polia', sets: 5, reps: '12-15', rest: 45, image: 'assets/cable_lateral_raise.png' },
            { name: 'Rosca Scott', sets: 5, reps: '10-12', rest: 45, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Preacher_Curl/0.jpg' },
            { name: 'Tríceps Corda', sets: 5, reps: '10-12', rest: 45, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Grip_Triceps_Pushdown/0.jpg' }
        ]
    },
    lower1: {
        id: 'lower1',
        name: 'Lower Body 1',
        image: 'assets/lower_body.jpg',
        exercises: [
            { name: 'Extensor', sets: 5, reps: '10-15', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/0.jpg' },
            { name: 'Hack Machine', sets: 5, reps: '10-12', rest: 90, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hack_Squat/0.jpg' },
            { name: 'Flexor Sentado', sets: 5, reps: '10-15', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Leg_Curl/0.jpg' },
            { name: 'Stiff', sets: 5, reps: '10-12', rest: 90, image: 'https://i.pinimg.com/originals/82/4d/fd/824dfd405284597cd20e8a55233e2d77.gif' },
            { name: 'Adutor', sets: 5, reps: '12-15', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Thigh_Adductor/0.jpg' },
            { name: 'Abdutor', sets: 5, reps: '12-15', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Thigh_Abductor/0.jpg' },
            { name: 'Lombar Máquina', sets: 5, reps: '10-15', rest: 60, image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2021/12/full-stretch-for-hyperextension.gif' },
            { name: 'Panturrilha Máquina em Pé', sets: 5, reps: '15-20', rest: 45, image: 'assets/panturrilha.png' }
        ]
    },
    upper2: {
        id: 'upper2',
        name: 'Upper Body 2',
        image: 'assets/upper_body.jpg',
        exercises: [
            { name: 'Supino Reto Máquina', sets: 5, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leverage_Chest_Press/0.jpg' },
            { name: 'Remada Máquina Fechada', sets: 5, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/0.jpg' },
            { name: 'Crucifixo na Máquina', sets: 5, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butterfly/0.jpg' },
            { name: 'Pulley Triângulo', sets: 5, reps: '10-12', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/V-Bar_Pulldown/0.jpg' },
            { name: 'Elevação Lateral na Polia', sets: 5, reps: '12-15', rest: 45, image: 'assets/cable_lateral_raise.png' },
            { name: 'Rosca Direta Cabo', sets: 5, reps: '10-12', rest: 45, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Biceps_Cable_Curl/0.jpg' },
            { name: 'Tríceps na Polia com Barra', sets: 5, reps: '10-12', rest: 45, image: 'assets/triceps_barra.png' }
        ]
    },
    lower2: {
        id: 'lower2',
        name: 'Lower Body 2',
        image: 'assets/lower_body.jpg',
        exercises: [
            { name: 'Extensor', sets: 5, reps: '10-15', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/0.jpg' },
            { name: 'Hack Machine', sets: 5, reps: '10-12', rest: 90, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hack_Squat/0.jpg' },
            { name: 'Flexor Sentado', sets: 5, reps: '10-15', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Leg_Curl/0.jpg' },
            { name: 'Stiff', sets: 5, reps: '10-12', rest: 90, image: 'https://i.pinimg.com/originals/82/4d/fd/824dfd405284597cd20e8a55233e2d77.gif' },
            { name: 'Adutor', sets: 5, reps: '12-15', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Thigh_Adductor/0.jpg' },
            { name: 'Abdutor', sets: 5, reps: '12-15', rest: 60, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Thigh_Abductor/0.jpg' },
            { name: 'Lombar Máquina', sets: 5, reps: '10-15', rest: 60, image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2021/12/full-stretch-for-hyperextension.gif' },
            { name: 'Panturrilha Máquina em Pé', sets: 5, reps: '15-20', rest: 45, image: 'assets/panturrilha.png' }
        ]
    },
    cardio: {
        id: 'cardio',
        name: 'Cardio',
        image: 'assets/cardio.jpg',
        exercises: [
            { name: 'Esteira, Bike ou Elíptico', sets: 1, reps: '45-60 min', rest: 0 },
            { name: 'Abdômen Crunch', sets: 5, reps: '15-20', rest: 45, image: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Crunch/0.jpg' }
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
