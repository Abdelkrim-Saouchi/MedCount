use tauri_plugin_sql::{Migration, MigrationKind};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE formes (forme_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nomination TEXT NOT NULL)", 
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_initial_tables",
            sql: "CREATE TABLE unites (unite_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nomination TEXT NOT NULL)", 
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create_initial_tables",
            sql: "CREATE TABLE medicaments (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nomination TEXT NOT NULL, capacite INTEGER DEFAULT 0, forme INTEGER, unite INTEGER, FOREIGN KEY (forme) REFERENCES formes(forme_id), FOREIGN KEY (unite) REFERENCES unites(unite_id))",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::new()
                .add_migrations("sqlite:test.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
