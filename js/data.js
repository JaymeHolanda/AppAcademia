const WORKOUT_DATA = {
    upper1: {
        id: 'upper1',
        name: 'Upper Body 1',
        image: 'assets/upper_body.jpg',
        exercises: [
            { name: 'Supino Inclinado Máquina', sets: 5, reps: '10-12', rest: 60, image: 'https://api.smartworkout.app/asset/video/19802258-83e4-4d98-a8b4-150cd55a8fc3.mp4' },
            { name: 'Remada Máquina', sets: 5, reps: '10-12', rest: 60, image: 'https://api.smartworkout.app/asset/video/0d1b1060-73fd-419d-8c52-696593719235.mp4' },
            { name: 'Voador', sets: 5, reps: '10-12', rest: 60, image: 'https://api.smartworkout.app/asset/video/9bfa2cc4-879b-4267-8333-945860b7ecb0.mp4' },
            { name: 'Pulley Aberto', sets: 5, reps: '10-12', rest: 60, image: 'https://api.smartworkout.app/asset/video/f4346fd2-da97-45ca-82dc-5402967879a1.mp4' },
            { name: 'Elevação Lateral na Polia', sets: 5, reps: '12-15', rest: 45, image: 'https://api.smartworkout.app/asset/video/ec3eb503-f5a0-4bbe-b76d-78f0b31fb683.mp4' },
            { name: 'Rosca Scott', sets: 5, reps: '10-12', rest: 45, image: 'https://api.smartworkout.app/asset/video/9dd8c1a1-afdf-4722-ab04-900c044612e3.mp4' },
            { name: 'Tríceps Corda', sets: 5, reps: '10-12', rest: 45, image: 'https://api.smartworkout.app/asset/video/9138cee9-ea6c-4a47-aa29-c8142e03420b.mp4' }
        ]
    },
    lower1: {
        id: 'lower1',
        name: 'Lower Body 1',
        image: 'assets/lower_body.jpg',
        exercises: [
            { name: 'Extensor', sets: 5, reps: '10-15', rest: 60, image: 'https://api.smartworkout.app/asset/video/19cc3000-635d-4cc1-a956-c06a3972210d.mp4' },
            { name: 'Hack Machine', sets: 5, reps: '10-12', rest: 90, image: 'https://api.smartworkout.app/asset/video/808a587d-8260-4c39-8e4d-0e127cc50eed.mp4' },
            { name: 'Flexor Sentado', sets: 5, reps: '10-15', rest: 60, image: 'https://api.smartworkout.app/asset/video/2c075cd9-cca2-4c24-b158-7c7e5c6a85cb.mp4' },
            { name: 'Stiff', sets: 5, reps: '10-12', rest: 90, image: 'https://i.pinimg.com/originals/82/4d/fd/824dfd405284597cd20e8a55233e2d77.gif' },
            { name: 'Adutor', sets: 5, reps: '12-15', rest: 60, image: 'https://api.smartworkout.app/asset/video/b45b76ff-f6ae-45d5-bdbb-7db2dd4e1797.mp4' },
            { name: 'Abdutor', sets: 5, reps: '12-15', rest: 60, image: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/hip-abduction-machine.gif?fit=600%2C600&ssl=1' },
            { name: 'Coice na Máquina', sets: 5, reps: '10-12', rest: 60, image: 'https://api.smartworkout.app/asset/video/b2d36598-82c7-4039-90ce-48b2e9c7ba64.mp4' },
            { name: 'Panturrilha Máquina em Pé', sets: 5, reps: '15-20', rest: 45, image: 'https://api.smartworkout.app/asset/video/10c419c0-6a03-4b8c-91b6-8a5a1ef1ff26.mp4' }
        ]
    },
    upper2: {
        id: 'upper2',
        name: 'Upper Body 2',
        image: 'assets/upper_body.jpg',
        exercises: [
            { name: 'Supino Reto Máquina', sets: 5, reps: '10-12', rest: 60, image: 'https://api.smartworkout.app/asset/video/b1da7c65-b714-4a3d-b092-11f8bc6a8242.mp4' },
            { name: 'Remada Máquina Fechada', sets: 5, reps: '10-12', rest: 60, image: 'https://api.smartworkout.app/asset/video/1cf39009-eafd-4130-b43c-4ef744469787.mp4' },
            { name: 'Crucifixo na Máquina', sets: 5, reps: '10-12', rest: 60, image: 'https://api.smartworkout.app/asset/video/dc19e916-7e3f-4634-9a4a-bfc252bc2f13.mp4' },
            { name: 'Pulley Triângulo', sets: 5, reps: '10-12', rest: 60, image: 'https://api.smartworkout.app/asset/video/bed500d2-6dac-4ad7-a679-dd0aa63627bc.mp4' },
            { name: 'Elevação Lateral na Polia', sets: 5, reps: '12-15', rest: 45, image: 'https://api.smartworkout.app/asset/video/ec3eb503-f5a0-4bbe-b76d-78f0b31fb683.mp4' },
            { name: 'Rosca Direta Cabo', sets: 5, reps: '10-12', rest: 45, image: 'https://api.smartworkout.app/asset/video/d68b8667-ef32-44f7-99be-a900ece49261.mp4' },
            { name: 'Tríceps na Polia com Barra', sets: 5, reps: '10-12', rest: 45, image: 'https://api.smartworkout.app/asset/video/85f4014c-44fb-4222-9483-5b2fe151fc7a.mp4' }
        ]
    },
    lower2: {
        id: 'lower2',
        name: 'Lower Body 2',
        image: 'assets/lower_body.jpg',
        exercises: [
            { name: 'Extensor', sets: 5, reps: '10-15', rest: 60, image: 'https://api.smartworkout.app/asset/video/19cc3000-635d-4cc1-a956-c06a3972210d.mp4' },
            { name: 'Hack Machine', sets: 5, reps: '10-12', rest: 90, image: 'https://api.smartworkout.app/asset/video/808a587d-8260-4c39-8e4d-0e127cc50eed.mp4' },
            { name: 'Flexor Sentado', sets: 5, reps: '10-15', rest: 60, image: 'https://api.smartworkout.app/asset/video/2c075cd9-cca2-4c24-b158-7c7e5c6a85cb.mp4' },
            { name: 'Stiff', sets: 5, reps: '10-12', rest: 90, image: 'https://i.pinimg.com/originals/82/4d/fd/824dfd405284597cd20e8a55233e2d77.gif' },
            { name: 'Adutor', sets: 5, reps: '12-15', rest: 60, image: 'https://api.smartworkout.app/asset/video/b45b76ff-f6ae-45d5-bdbb-7db2dd4e1797.mp4' },
            { name: 'Abdutor', sets: 5, reps: '12-15', rest: 60, image: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/hip-abduction-machine.gif?fit=600%2C600&ssl=1' },
            { name: 'Coice na Máquina', sets: 5, reps: '10-12', rest: 60, image: 'https://api.smartworkout.app/asset/video/b2d36598-82c7-4039-90ce-48b2e9c7ba64.mp4' },
            { name: 'Panturrilha Máquina em Pé', sets: 5, reps: '15-20', rest: 45, image: 'https://api.smartworkout.app/asset/video/10c419c0-6a03-4b8c-91b6-8a5a1ef1ff26.mp4' }
        ]
    },
    cardio: {
        id: 'cardio',
        name: 'Cardio',
        image: 'assets/cardio.jpg',
        exercises: [
            { name: 'Esteira, Bike ou Elíptico', sets: 1, reps: '45-60 min', rest: 0 },
            { name: 'Lombar Máquina', sets: 5, reps: '10-15', rest: 60, image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2021/12/full-stretch-for-hyperextension.gif' },
            { name: 'Abdômen Crunch', sets: 5, reps: '15-20', rest: 45, image: 'https://api.smartworkout.app/asset/video/b9a3d7b9-fb2a-4eba-a4ad-091681cad6f0.mp4' }
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
