const fs = require("fs");
const path = require("path");

const migrationPath = path.join(__dirname, "..", "migrations", "005_rls_titularidade_e_auditoria.sql");
const sql = fs.readFileSync(migrationPath, "utf8");

const expectedTables = [
  "users",
  "clients",
  "dajs",
  "attendances",
  "processes",
  "process_movements",
  "documents",
  "deadlines",
  "deadline_alerts",
  "workspace_messages",
  "audit_logs",
  "office_groups",
  "offices",
  "daj_office_shares",
  "attendance_media",
  "adapted_dossiers",
];

const missingTables = expectedTables.filter(
  (table) => !sql.includes(`alter table ${table} enable row level security;`)
);

const requiredFunctions = [
  "jus9_current_user_id",
  "jus9_current_user_profile",
  "jus9_is_admin",
  "jus9_is_daj_titular",
  "jus9_can_read_daj",
];

const missingFunctions = requiredFunctions.filter(
  (name) => !sql.includes(`function ${name}`)
);

const policyCount = (sql.match(/create policy /g) || []).length;

if (missingTables.length || missingFunctions.length || policyCount < 18) {
  console.error("RLS_STRUCTURE_INVALID");
  if (missingTables.length) console.error(`missing_tables=${missingTables.join(",")}`);
  if (missingFunctions.length) console.error(`missing_functions=${missingFunctions.join(",")}`);
  if (policyCount < 18) console.error(`policies=${policyCount}`);
  process.exit(1);
}

console.log(`RLS_STRUCTURE_OK tables=${expectedTables.length} policies=${policyCount}`);
