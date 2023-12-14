const COLLECTIONS = {
    USERS: 'users',
    PERMISSIONS: 'permissions',
    ACCESS_KEYS: 'access-keys',
    COUNTERS: 'counters',
    LEVELS: 'levels',
    GROUPS: 'groups',
    LANGUAGES: 'languages',
    QUESTIONNARIES: 'questionnaries',
    QUESTIONS: 'questions',
    BUGS: 'bugs',
    APK: 'apk'
}

const PERMISSIONS = {
    ADMIN: 'Administrador',
    TEACHER: 'Docente',
    STUDENT: 'Estudiante',
    ALL: ['Administrador', 'Docente', 'Estudiante']
}

const STORAGE = {
    LANGUAGES: 'languages',
    QUESTION: 'question',
    AUDIOS: 'audios',
    IMAGES: 'images',
    BUGS: 'bugs'
}

const ROUTES = {
    DASHBOARD : 'dashboard',
    LANGUAGES : 'languages',
    LEVELS : 'levels',
    USERS : 'users',
    GROUPS : 'groups',
    QUESTIONNARIES: 'questionnaries',
    QUESTIONS: 'questions',
    QUESTION: 'question',
    PROFILE: 'profile',
    BUGS: 'bugs'
}

const TYPES = {
    SPEAKING: 'speaking',
    LISTENING: 'listening',
    READING: 'reading',
    WRITING: 'writing'
}


module.exports = {
    COLLECTIONS,
    PERMISSIONS,
    STORAGE,
    ROUTES,
    TYPES
}



