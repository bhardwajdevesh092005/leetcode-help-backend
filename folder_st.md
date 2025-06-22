leetcode-backend/
├── src/
│   ├── config/
│   │   └── db.ts                    # MongoDB connection
│   │
│   ├── controllers/
│   │   └── questionController.ts    # Logic for parsing question, returning main()
│   │
│   ├── models/
│   │   └── Question.ts              # Mongoose schema
│   │
│   ├── routes/
│   │   └── questionRoutes.ts        # API endpoints (e.g., /generateMain)
│   │
│   ├── utils/
│   │   └── llmService.ts            # (Optional) Code to call LLM, generate main()
│   │
│   └── app.ts                       # Express app setup
│
├── .env                             # Secrets like MONGO_URI, API keys
├── package.json
├── tsconfig.json
└── README.md
