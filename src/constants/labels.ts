import {Label} from "../types/labels.js";

export const labels: Label[] = [
    {
        id: "fourteen",
        locales: [
            {
                "lang": "en",
                "name": "<14d🎂",
                "description": "This user's birthday is in less than 14 days"
            },
            {
                "lang": "es",
                "name": "<14d🎂",
                "description": "El cumpleaños de este usuario es en menos de 14 días"
            }
        ],
        startDays: -14,
        endDays: -7
    },
    {
        "id": "seven",
        "locales": [
            {
                "lang": "en",
                "name": "7d🎂",
                "description": "This user's birthday is in 7 days"
            },
            {
                "lang": "es",
                "name": "7d🎂",
                "description": "El cumpleaños de este usuario es dentro de 7 días"
            }
        ],
        startDays: -7,
        endDays: -6
    },
    {
        "id": "six",
        "locales": [
            {
                "lang": "en",
                "name": "6d🎂",
                "description": "This user birthday is in 6 days"
            },
            {
                "lang": "es",
                "name": "6d🎂",
                "description": "El cumpleaños de este usuario es dentro de 6 días"
            }
        ],
        startDays: -6,
        endDays: -5
    },
    {
        "id": "five",
        "locales": [
            {
                "lang": "en",
                "name": "5d🎂",
                "description": "This user birthday is in 5 days"
            },
            {
                "lang": "es",
                "name": "5d🎂",
                "description": "El cumpleaños de este usuario es dentro de 5 días"
            }
        ],
        startDays: -5,
        endDays: -4
    },
    {
        "id": "four",
        "locales": [
            {
                "lang": "en",
                "name": "4d🎂",
                "description": "This user birthday is in 4 days"
            },
            {
                "lang": "es",
                "name": "4d🎂",
                "description": "El cumpleaños de este usuario es dentro de 4 días"
            }
        ],
        startDays: -4,
        endDays: -3
    },
    {
        "id": "three",
        "locales": [
            {
                "lang": "en",
                "name": "3d🎂",
                "description": "This user birthday is in 3 days"
            },
            {
                "lang": "es",
                "name": "3d🎂",
                "description": "El cumpleaños de este usuario es dentro de 3 días"
            }
        ],
        startDays: -3,
        endDays: -2
    },
    {
        "id": "two",
        "locales": [
            {
                "lang": "en",
                "name": "2d🎂",
                "description": "This user birthday is in 2 days"
            },
            {
                "lang": "es",
                "name": "2d🎂",
                "description": "El cumpleaños de este usuario es dentro de 2 días"
            }
        ],
        startDays: -2,
        endDays: -1
    },
    {
        "id": "tomorrow",
        "locales": [
            {
                "lang": "en",
                "name": "Tomorrow🎂",
                "description": "This user birthday is tomorrow"
            },
            {
                "lang": "es",
                "name": "Mañana🎂",
                "description": "El cumpleaños de este usuario es mañana"
            }
        ],
        startDays: -1,
        endDays: 0
    },
    {
        "id": "today",
        "locales": [
            {
                "lang": "en",
                "name": "🎂🎂🎂",
                "description": "This user birthday is today"
            },
            {
                "lang": "es",
                "name": "🎂🎂🎂",
                "description": "El cumpleaños de este usuario es hoy"
            }
        ],
        startDays: 0,
        endDays: 1
    },
    {
        "id": "yesterday",
        "locales": [
            {
                "lang": "en",
                "name": "Yesterday🎂",
                "description": "This user birthday was yesterday"
            },
            {
                "lang": "es",
                "name": "Ayer🎂",
                "description": "El cumpleaños de este usuario fue ayer"
            }
        ],
        startDays: 1,
        endDays: 2
    },
    {
        "id": "lastweek",
        "locales": [
            {
                "lang": "en",
                "name": "Last week🎂",
                "description": "This user birthday was last week"
            },
            {
                "lang": "es",
                "name": "La semana pasada🎂",
                "description": "El cumpleaños de este usuario fue la semana pasada"
            }
        ],
        startDays: 2,
        endDays: 7
    }
]

export const sortedLabels = labels.sort((a, b) => a.startDays - b.startDays)