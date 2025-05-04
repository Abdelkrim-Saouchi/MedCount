use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
};
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
        .setup(|app| {
            let quit_i = MenuItem::with_id(app, "quit", "Quiter", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&quit_i])?;
            let _tray = TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .show_menu_on_left_click(true)
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "quit" => {
                        println!("quit menu item was clicked");
                        app.exit(0);
                    }
                    _ => {
                        println!("menu item {:?} not handled", event.id);
                    }
                })
                .build(app)?;

            Ok(())
        })
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
