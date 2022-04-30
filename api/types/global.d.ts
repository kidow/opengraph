declare namespace NodeJS {
    interface Process {
        env: ProcessEnv
    }
    interface ProcessEnv {
        NODE_ENV: string
        SUPABASE_URL: string
        SUPABASE_KEY: string
    }
}