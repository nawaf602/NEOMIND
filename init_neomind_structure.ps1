# =========================
# NEOMIND Structure Initializer
# =========================

# تحديد جذر المشروع:
# - لو السكربت محفوظ في ملف: يستخدم مسار الملف
# - لو السكربت ملصوق مباشرة في التيرمنال: يستخدم المسار الحالي
if ($MyInvocation.MyCommand.Path) {
    $root = Split-Path -Parent $MyInvocation.MyCommand.Path
} else {
    $root = (Get-Location).Path
}

function New-Dir($path) {
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path | Out-Null
    }
}

function New-File($path, $content) {
    $dir = Split-Path $path
    if (-not (Test-Path $dir)) {
        New-Dir $dir
    }
    Set-Content -Path $path -Value $content -Encoding UTF8
}

Write-Host "Initializing NEOMIND structure at $root ..."

# =========================
# جذر المشروع
# =========================

New-File "$root\package.json" @'
{
  "name": "neomind-platform",
  "version": "0.1.0",
  "private": true,
  "description": "NEOMIND sovereign-grade predictive security and digital-twin platform monorepo.",
  "main": "index.js",
  "workspaces": [
    "services/*",
    "frontend"
  ],
  "scripts": {
    "dev": "npm run dev --workspaces",
    "build": "npm run build --workspaces",
    "lint": "npm run lint --workspaces",
    "test": "npm run test --workspaces",
    "format": "npm run format --workspaces"
  },
  "devDependencies": {
    "ts-node": "^10.9.2",
    "typescript": "^5.6.3"
  }
}
'@

New-File "$root\tsconfig.base.json" @'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": ".",
    "baseUrl": "."
  },
  "exclude": [
    "node_modules",
    "**/node_modules",
    "**/dist",
    "**/.next",
    "**/artifacts",
    "**/__pycache__",
    "**/.venv"
  ]
}
'@

New-File "$root\.gitignore" @'
# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Build outputs
dist/
build/
.out/
.next/
.turbo/

# Env files
.env
.env.local
.env.development.local
.env.production.local
.env.test.local

# Logs
logs/
*.log
logs/*.log

# IDE / Editor
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Python / ML
__pycache__/
*.pyc
.venv/
venv/
.pytest_cache/
.ipynb_checkpoints/

# ML artifacts
services/ml-engine/src/ml_engine/artifacts/*
!services/ml-engine/src/ml_engine/artifacts/.gitkeep
'@

New-File "$root\.env.example" @'
# NEOMIND root env example

NODE_ENV=development

CORE_ENGINE_PORT=5100
API_GATEWAY_PORT=5200
FRONTEND_PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=neomind_db
DB_USER=neomind_user
DB_PASSWORD=change_me

ML_ENGINE_HOST=localhost
ML_ENGINE_PORT=5300
'@

New-File "$root\README.md" "# NEOMIND Platform`r`n"

# =========================
# docs
# =========================

New-Dir "$root\docs\00_overview"
New-Dir "$root\docs\01_psic"
New-Dir "$root\docs\02_nsdt"
New-Dir "$root\docs\03_context_and_simulation"
New-Dir "$root\docs\04_decision_and_c4s"
New-Dir "$root\docs\05_integration"
New-Dir "$root\docs\06_security_and_governance"
New-Dir "$root\docs\07_truth_memory_drift"
New-Dir "$root\docs\08_identity_behavior_social"
New-Dir "$root\docs\09_nifl_identity_fusion"
New-Dir "$root\docs\10_roadmap"

# Overview
New-File "$root\docs\00_overview\00_neomind_vision.md" "# NEOMIND Vision`r`n"
New-File "$root\docs\00_overview\01_problem_painpoints.md" "# Problem & Pain Points`r`n"
New-File "$root\docs\00_overview\02_methodology_and_principles.md" "# Methodology & Principles`r`n"

# PSIC
New-File "$root\docs\01_psic\01_psic_conceptual_model.md" "# PSIC Conceptual Model`r`n"
New-File "$root\docs\01_psic\02_psic_data_flows.md" "# PSIC Data Flows`r`n"
New-File "$root\docs\01_psic\03_psic_algorithms_catalog.md" "# PSIC Algorithms Catalog`r`n"
New-File "$root\docs\01_psic\04_psic_mvp_scope.md" "# PSIC MVP Scope`r`n"

# NSDT
New-File "$root\docs\02_nsdt\01_nsdt_conceptual_model.md" "# NSDT Conceptual Model`r`n"
New-File "$root\docs\02_nsdt\02_nsdt_domains_and_views.md" "# NSDT Domains and Views`r`n"
New-File "$root\docs\02_nsdt\03_nsdt_state_model.md" "# NSDT State Model`r`n"

# Context & Simulation
New-File "$root\docs\03_context_and_simulation\01_context_engine_CSE.md" "# Context Engine (CSE)`r`n"
New-File "$root\docs\03_context_and_simulation\02_simulation_grid_NSSG.md" "# Simulation Grid (NSSG)`r`n"
New-File "$root\docs\03_context_and_simulation\03_scenarios_library.md" "# Scenarios Library`r`n"

# Decision & C4S
New-File "$root\docs\04_decision_and_c4s\01_sodc_model.md" "# SODC Model`r`n"
New-File "$root\docs\04_decision_and_c4s\02_c4s_integration.md" "# C4S Integration`r`n"
New-File "$root\docs\04_decision_and_c4s\03_roles_and_usecases.md" "# Roles and Use Cases`r`n"

# Integration
New-File "$root\docs\05_integration\01_snsif_framework.md" "# SNSIF Framework`r`n"
New-File "$root\docs\05_integration\02_sdeia_architecture.md" "# SDEIA Architecture`r`n"

# Security & Governance
New-File "$root\docs\06_security_and_governance\01_scapa_model.md" "# SCAPA Model`r`n"
New-File "$root\docs\06_security_and_governance\02_sdghf_model.md" "# SDGHF Model`r`n"

# Truth, Memory, Drift
New-File "$root\docs\07_truth_memory_drift\01_gtv_ground_truth.md" "# GTV Ground Truth`r`n"
New-File "$root\docs\07_truth_memory_drift\02_smai_state_memory.md" "# SMAI State Memory`r`n"
New-File "$root\docs\07_truth_memory_drift\03_sdc_nre_drift_control.md" "# SDC-NRE Drift Control`r`n"
New-File "$root\docs\07_truth_memory_drift\04_shrsa_vitality_doctrine.md" "# SHRSA Digital Vitality Doctrine`r`n"

# Identity / Behavior / Social
New-File "$root\docs\08_identity_behavior_social\01_siia_identity_architecture.md" "# SIIA Identity Architecture`r`n"
New-File "$root\docs\08_identity_behavior_social\02_npbs_behavior_system.md" "# NPBS Behavior System`r`n"
New-File "$root\docs\08_identity_behavior_social\03_ssrpf_social_risk_framework.md" "# S-SRPF Social Risk Framework`r`n"
New-File "$root\docs\08_identity_behavior_social\04_dsse_deep_social_shift.md" "# DSSE Deep Social Shift`r`n"
New-File "$root\docs\08_identity_behavior_social\05_scte_cultural_transition.md" "# SCTE Cultural Transition`r`n"

# NIFL
New-File "$root\docs\09_nifl_identity_fusion\01_nifl_model.md" "# NIFL Model`r`n"

# Roadmap
New-File "$root\docs\10_roadmap\01_delivery_phases.md" "# Delivery Phases`r`n"
New-File "$root\docs\10_roadmap\02_mvp_vs_full_architecture.md" "# MVP vs Full Architecture`r`n"

# =========================
# services/core-engine
# =========================

New-Dir "$root\services\core-engine\src\app"
New-Dir "$root\services\core-engine\src\shared\logging"
New-Dir "$root\services\core-engine\src\shared\types"
New-Dir "$root\services\core-engine\src\shared\utils"
New-Dir "$root\services\core-engine\src\shared\events"
New-Dir "$root\services\core-engine\src\infra\database\migrations"
New-Dir "$root\services\core-engine\src\infra\messaging"
New-Dir "$root\services\core-engine\src\infra\persistence"
New-Dir "$root\services\core-engine\src\modules\psic\ml"
New-Dir "$root\services\core-engine\src\modules\psic\domain\entities"
New-Dir "$root\services\core-engine\src\modules\psic\domain\services"
New-Dir "$root\services\core-engine\src\modules\psic\domain\repositories"
New-Dir "$root\services\core-engine\src\modules\psic\application\dto"
New-Dir "$root\services\core-engine\src\modules\psic\application\usecases"
New-Dir "$root\services\core-engine\src\modules\psic\infrastructure\mappers"
New-Dir "$root\services\core-engine\src\modules\psic\infrastructure\subscribers"

New-Dir "$root\services\core-engine\src\modules\nsdt\domain\entities"
New-Dir "$root\services\core-engine\src\modules\nsdt\domain\services"
New-Dir "$root\services\core-engine\src\modules\nsdt\application\dto"
New-Dir "$root\services\core-engine\src\modules\nsdt\application\usecases"
New-Dir "$root\services\core-engine\src\modules\nsdt\infrastructure"

New-Dir "$root\services\core-engine\src\modules\context-simulation\context\domain\services"
New-Dir "$root\services\core-engine\src\modules\context-simulation\context\application"
New-Dir "$root\services\core-engine\src\modules\context-simulation\simulation\domain\services"
New-Dir "$root\services\core-engine\src\modules\context-simulation\simulation\application"

New-Dir "$root\services\core-engine\src\modules\decision-c4s\domain\entities"
New-Dir "$root\services\core-engine\src\modules\decision-c4s\domain\services"
New-Dir "$root\services\core-engine\src\modules\decision-c4s\application\dto"
New-Dir "$root\services\core-engine\src\modules\decision-c4s\application\usecases"

New-Dir "$root\services\core-engine\src\modules\identity-behavior\ml"
New-Dir "$root\services\core-engine\src\modules\identity-behavior\domain\entities"
New-Dir "$root\services\core-engine\src\modules\identity-behavior\domain\services"
New-Dir "$root\services\core-engine\src\modules\identity-behavior\application\dto"
New-Dir "$root\services\core-engine\src\modules\identity-behavior\application\usecases"

New-Dir "$root\services\core-engine\src\modules\integration\domain\services"
New-Dir "$root\services\core-engine\src\modules\integration\application"

New-Dir "$root\services\core-engine\src\modules\security-governance\security\services"
New-Dir "$root\services\core-engine\src\modules\security-governance\governance\services"

New-Dir "$root\services\core-engine\src\modules\truth-memory-drift\gtv\services"
New-Dir "$root\services\core-engine\src\modules\truth-memory-drift\smai\services"
New-Dir "$root\services\core-engine\src\modules\truth-memory-drift\sdc-nre\services"
New-Dir "$root\services\core-engine\src\modules\truth-memory-drift\shrsa\services"
New-Dir "$root\services\core-engine\src\modules\truth-memory-drift\application\dto"
New-Dir "$root\services\core-engine\src\modules\truth-memory-drift\application\usecases"

New-File "$root\services\core-engine\package.json" @'
{
  "name": "@neomind/core-engine",
  "version": "0.1.0",
  "private": true,
  "description": "NEOMIND core engine service (PSIC, NSDT, decision logic).",
  "main": "dist/main.js",
  "scripts": {
    "start": "node dist/main.js",
    "start:dev": "ts-node src/app/main.ts",
    "build": "tsc -p tsconfig.json",
    "lint": "echo \"no lint configured yet\"",
    "test": "echo \"no tests configured yet\""
  },
  "dependencies": {},
  "devDependencies": {}
}
'@

New-File "$root\services\core-engine\tsconfig.json" @'
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
'@

New-File "$root\services\core-engine\nest-cli.json" @'
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}
'@

New-File "$root\services\core-engine\.env.example" @'
# Core Engine Service Env Example

CORE_ENGINE_PORT=5100

CORE_DB_HOST=localhost
CORE_DB_PORT=5432
CORE_DB_NAME=neomind_core
CORE_DB_USER=neomind_core_user
CORE_DB_PASSWORD=change_me

ML_ENGINE_HOST=localhost
ML_ENGINE_PORT=5300
'@

New-File "$root\services\core-engine\README.md" "# NEOMIND Core Engine`r`n"

New-File "$root\services\core-engine\src\app\main.ts" @'
// NEOMIND Core Engine — bootstrap placeholder

console.log("NEOMIND Core Engine — bootstrap placeholder is running.");
'@

New-File "$root\services\core-engine\src\app\AppModule.ts" "// TODO: AppModule implementation`r`n"
New-File "$root\services\core-engine\src\app\AppConfig.ts" "// TODO: AppConfig implementation`r`n"

# shared
New-File "$root\services\core-engine\src\shared\logging\Logger.service.ts" "// TODO: Logger service`r`n"
New-File "$root\services\core-engine\src\shared\types\Result.ts" "// TODO: Result type`r`n"
New-File "$root\services\core-engine\src\shared\types\Maybe.ts" "// TODO: Maybe type`r`n"
New-File "$root\services\core-engine\src\shared\utils\Time.utils.ts" "// TODO: Time utils`r`n"
New-File "$root\services\core-engine\src\shared\utils\Geo.utils.ts" "// TODO: Geo utils`r`n"
New-File "$root\services\core-engine\src\shared\events\DomainEvent.ts" "// TODO: DomainEvent base class`r`n"
New-File "$root\services\core-engine\src\shared\events\EventBus.interface.ts" "// TODO: EventBus interface`r`n"

# infra
New-File "$root\services\core-engine\src\infra\database\TypeOrmConfig.ts" "// TODO: DB config`r`n"
New-File "$root\services\core-engine\src\infra\database\migrations\.gitkeep" ""
New-File "$root\services\core-engine\src\infra\messaging\MessageBus.interface.ts" "// TODO: Message bus interface`r`n"
New-File "$root\services\core-engine\src\infra\messaging\InMemoryBus.adapter.ts" "// TODO: In-memory bus adapter`r`n"
New-File "$root\services\core-engine\src\infra\messaging\KafkaBus.adapter.ts" "// TODO: Kafka bus adapter`r`n"
New-File "$root\services\core-engine\src\infra\persistence\IncidentRepository.impl.ts" "// TODO: Incident repository`r`n"
New-File "$root\services\core-engine\src\infra\persistence\GeoZoneRepository.impl.ts" "// TODO: Geo zone repository`r`n"
New-File "$root\services\core-engine\src\infra\persistence\NSDTStateRepository.impl.ts" "// TODO: NSDT state repository`r`n"
New-File "$root\services\core-engine\src\infra\persistence\IdentityProfileRepository.impl.ts" "// TODO: Identity profile repository`r`n"

# modules/psic
New-File "$root\services\core-engine\src\modules\psic\PSICModule.ts" "// TODO: PSIC module`r`n"
New-File "$root\services\core-engine\src\modules\psic\PSICConstants.ts" "// TODO: PSIC constants`r`n"

New-File "$root\services\core-engine\src\modules\psic\ml\OneClassSvmModel.ts" "// TODO: One-Class SVM client`r`n"
New-File "$root\services\core-engine\src\modules\psic\ml\IsolationForestModel.ts" "// TODO: Isolation Forest client`r`n"
New-File "$root\services\core-engine\src\modules\psic\ml\LstmForecastModel.ts" "// TODO: LSTM forecast client`r`n"
New-File "$root\services\core-engine\src\modules\psic\ml\AutoencoderAnomalyModel.ts" "// TODO: Autoencoder anomaly client`r`n"
New-File "$root\services\core-engine\src\modules\psic\ml\GnnRiskPropagationModel.ts" "// TODO: GNN risk propagation client`r`n"

New-File "$root\services\core-engine\src\modules\psic\domain\entities\RawEvent.entity.ts" "// TODO: RawEvent entity`r`n"
New-File "$root\services\core-engine\src\modules\psic\domain\entities\NormalizedEvent.entity.ts" "// TODO: NormalizedEvent entity`r`n"
New-File "$root\services\core-engine\src\modules\psic\domain\entities\PatternSnapshot.entity.ts" "// TODO: PatternSnapshot entity`r`n"
New-File "$root\services\core-engine\src\modules\psic\domain\entities\RiskProjection.entity.ts" "// TODO: RiskProjection entity`r`n"

New-File "$root\services\core-engine\src\modules\psic\domain\services\NormalizationEngine.service.ts" "// TODO: Normalization engine`r`n"
New-File "$root\services\core-engine\src\modules\psic\domain\services\PatternEngine.service.ts" "// TODO: Pattern engine`r`n"
New-File "$root\services\core-engine\src\modules\psic\domain\services\RiskScoringEngine.service.ts" "// TODO: Risk scoring engine`r`n"
New-File "$root\services\core-engine\src\modules\psic\domain\services\GraphIntelligence.service.ts" "// TODO: Graph intelligence service`r`n"
New-File "$root\services\core-engine\src\modules\psic\domain\services\PredictionEngine.service.ts" "// TODO: Prediction engine`r`n"

New-File "$root\services\core-engine\src\modules\psic\domain\repositories\EventReadRepository.ts" "// TODO: Event read repository`r`n"
New-File "$root\services\core-engine\src\modules\psic\domain\repositories\RiskProjectionRepository.ts" "// TODO: Risk projection repository`r`n"

New-File "$root\services\core-engine\src\modules\psic\application\dto\IngestEvent.dto.ts" "// TODO: IngestEvent DTO`r`n"
New-File "$root\services\core-engine\src\modules\psic\application\dto\GetHeatmap.dto.ts" "// TODO: GetHeatmap DTO`r`n"
New-File "$root\services\core-engine\src\modules\psic\application\dto\GetProjections.dto.ts" "// TODO: GetProjections DTO`r`n"

New-File "$root\services\core-engine\src\modules\psic\application\usecases\IngestEvent.usecase.ts" "// TODO: IngestEvent usecase`r`n"
New-File "$root\services\core-engine\src\modules\psic\application\usecases\ComputeRiskForZone.usecase.ts" "// TODO: ComputeRiskForZone usecase`r`n"
New-File "$root\services\core-engine\src\modules\psic\application\usecases\GetPSICSummary.usecase.ts" "// TODO: GetPSICSummary usecase`r`n"

New-File "$root\services\core-engine\src\modules\psic\application\PSICService.ts" "// TODO: PSIC service`r`n"
New-File "$root\services\core-engine\src\modules\psic\infrastructure\mappers\EventMapper.ts" "// TODO: Event mapper`r`n"
New-File "$root\services\core-engine\src\modules\psic\infrastructure\subscribers\EventStreamSubscriber.ts" "// TODO: Event stream subscriber`r`n"

# modules/nsdt
New-File "$root\services\core-engine\src\modules\nsdt\NSDTModule.ts" "// TODO: NSDT module`r`n"
New-File "$root\services\core-engine\src\modules\nsdt\domain\entities\NSDTState.entity.ts" "// TODO: NSDTState entity`r`n"
New-File "$root\services\core-engine\src\modules\nsdt\domain\entities\ZoneState.entity.ts" "// TODO: ZoneState entity`r`n"
New-File "$root\services\core-engine\src\modules\nsdt\domain\services\NSDTStateEngine.service.ts" "// TODO: NSDT state engine`r`n"
New-File "$root\services\core-engine\src\modules\nsdt\domain\services\GeoRegistry.service.ts" "// TODO: Geo registry service`r`n"
New-File "$root\services\core-engine\src\modules\nsdt\domain\services\StateProjection.service.ts" "// TODO: State projection service`r`n"
New-File "$root\services\core-engine\src\modules\nsdt\application\dto\GetNSDTState.dto.ts" "// TODO: GetNSDTState DTO`r`n"
New-File "$root\services\core-engine\src\modules\nsdt\application\dto\GetZoneTimeline.dto.ts" "// TODO: GetZoneTimeline DTO`r`n"
New-File "$root\services\core-engine\src\modules\nsdt\application\usecases\GetNationalState.usecase.ts" "// TODO: GetNationalState usecase`r`n"
New-File "$root\services\core-engine\src\modules\nsdt\application\usecases\GetZoneStateTimeline.usecase.ts" "// TODO: GetZoneStateTimeline usecase`r`n"
New-File "$root\services\core-engine\src\modules\nsdt\application\NSDTService.ts" "// TODO: NSDT service`r`n"
New-File "$root\services\core-engine\src\modules\nsdt\infrastructure\NSDTStateRepository.impl.ts" "// TODO: NSDTState repository`r`n"

# context-simulation
New-File "$root\services\core-engine\src\modules\context-simulation\ContextSimulationModule.ts" "// TODO: ContextSimulation module`r`n"
New-File "$root\services\core-engine\src\modules\context-simulation\context\domain\services\SpatialContextEngine.service.ts" "// TODO: Spatial context engine`r`n"
New-File "$root\services\core-engine\src\modules\context-simulation\context\domain\services\TemporalContextEngine.service.ts" "// TODO: Temporal context engine`r`n"
New-File "$root\services\core-engine\src\modules\context-simulation\context\domain\services\BehavioralContextEngine.service.ts" "// TODO: Behavioral context engine`r`n"
New-File "$root\services\core-engine\src\modules\context-simulation\context\domain\services\SecurityContextEngine.service.ts" "// TODO: Security context engine`r`n"
New-File "$root\services\core-engine\src\modules\context-simulation\context\application\ContextScoringService.ts" "// TODO: Context scoring service`r`n"

New-File "$root\services\core-engine\src\modules\context-simulation\simulation\domain\services\MobilityScenarioEngine.service.ts" "// TODO: MobilityScenario engine`r`n"
New-File "$root\services\core-engine\src\modules\context-simulation\simulation\domain\services\CrowdScenarioEngine.service.ts" "// TODO: CrowdScenario engine`r`n"
New-File "$root\services\core-engine\src\modules\context-simulation\simulation\domain\services\WeatherImpactEngine.service.ts" "// TODO: WeatherImpact engine`r`n"
New-File "$root\services\core-engine\src\modules\context-simulation\simulation\domain\services\EventScenarioEngine.service.ts" "// TODO: EventScenario engine`r`n"
New-File "$root\services\core-engine\src\modules\context-simulation\simulation\application\RunScenario.usecase.ts" "// TODO: RunScenario usecase`r`n"
New-File "$root\services\core-engine\src\modules\context-simulation\simulation\application\SimulationService.ts" "// TODO: Simulation service`r`n"

# decision-c4s
New-File "$root\services\core-engine\src\modules\decision-c4s\DecisionC4SModule.ts" "// TODO: DecisionC4S module`r`n"
New-File "$root\services\core-engine\src\modules\decision-c4s\domain\entities\Command.entity.ts" "// TODO: Command entity`r`n"
New-File "$root\services\core-engine\src\modules\decision-c4s\domain\entities\DecisionView.entity.ts" "// TODO: DecisionView entity`r`n"
New-File "$root\services\core-engine\src\modules\decision-c4s\domain\services\UnifiedNationalPictureBuilder.service.ts" "// TODO: Unified picture builder`r`n"
New-File "$root\services\core-engine\src\modules\decision-c4s\domain\services\PredictiveDecisionViewBuilder.service.ts" "// TODO: Predictive decision view builder`r`n"
New-File "$root\services\core-engine\src\modules\decision-c4s\domain\services\CommandRoutingEngine.service.ts" "// TODO: Command routing engine`r`n"
New-File "$root\services\core-engine\src\modules\decision-c4s\domain\services\CommandFeedbackEngine.service.ts" "// TODO: Command feedback engine`r`n"
New-File "$root\services\core-engine\src\modules\decision-c4s\application\dto\GetDecisionView.dto.ts" "// TODO: GetDecisionView DTO`r`n"
New-File "$root\services\core-engine\src\modules\decision-c4s\application\dto\SubmitCommandFeedback.dto.ts" "// TODO: SubmitCommandFeedback DTO`r`n"
New-File "$root\services\core-engine\src\modules\decision-c4s\application\usecases\BuildDecisionView.usecase.ts" "// TODO: BuildDecisionView usecase`r`n"
New-File "$root\services\core-engine\src\modules\decision-c4s\application\usecases\SubmitCommandFeedback.usecase.ts" "// TODO: SubmitCommandFeedback usecase`r`n"
New-File "$root\services\core-engine\src\modules\decision-c4s\application\DecisionService.ts" "// TODO: Decision service`r`n"

# identity-behavior
New-File "$root\services\core-engine\src\modules\identity-behavior\IdentityBehaviorModule.ts" "// TODO: IdentityBehavior module`r`n"
New-File "$root\services\core-engine\src\modules\identity-behavior\ml\BehaviorAnomalyModel.ts" "// TODO: Behavior anomaly model`r`n"
New-File "$root\services\core-engine\src\modules\identity-behavior\domain\entities\IdentityProfile.entity.ts" "// TODO: IdentityProfile entity`r`n"
New-File "$root\services\core-engine\src\modules\identity-behavior\domain\entities\BehaviorPattern.entity.ts" "// TODO: BehaviorPattern entity`r`n"
New-File "$root\services\core-engine\src\modules\identity-behavior\domain\entities\SocialRiskIndicator.entity.ts" "// TODO: SocialRiskIndicator entity`r`n"
New-File "$root\services\core-engine\src\modules\identity-behavior\domain\services\IdentityIntelligenceEngine.service.ts" "// TODO: IdentityIntelligence engine`r`n"
New-File "$root\services\core-engine\src\modules\identity-behavior\domain\services\BehaviorPredictionEngine.service.ts" "// TODO: BehaviorPrediction engine`r`n"
New-File "$root\services\core-engine\src\modules\identity-behavior\domain\services\SocialRiskEngine.service.ts" "// TODO: SocialRisk engine`r`n"
New-File "$root\services\core-engine\src\modules\identity-behavior\domain\services\CulturalTransitionEngine.service.ts" "// TODO: CulturalTransition engine`r`n"
New-File "$root\services\core-engine\src\modules\identity-behavior\domain\services\IdentityFusionEngine.service.ts" "// TODO: IdentityFusion engine`r`n"
New-File "$root\services\core-engine\src\modules\identity-behavior\application\dto\GetIdentityRiskProfile.dto.ts" "// TODO: GetIdentityRiskProfile DTO`r`n"
New-File "$root\services\core-engine\src\modules\identity-behavior\application\dto\GetSocialRiskMap.dto.ts" "// TODO: GetSocialRiskMap DTO`r`n"
New-File "$root\services\core-engine\src\modules\identity-behavior\application\usecases\AnalyzeIdentityProfile.usecase.ts" "// TODO: AnalyzeIdentityProfile usecase`r`n"
New-File "$root\services\core-engine\src\modules\identity-behavior\application\usecases\ComputeSocialRiskForZone.usecase.ts" "// TODO: ComputeSocialRiskForZone usecase`r`n"
New-File "$root\services\core-engine\src\modules\identity-behavior\application\IdentityBehaviorService.ts" "// TODO: IdentityBehavior service`r`n"

# integration
New-File "$root\services\core-engine\src\modules\integration\IntegrationModule.ts" "// TODO: Integration module`r`n"
New-File "$root\services\core-engine\src\modules\integration\domain\services\DataIntegrationLayer.service.ts" "// TODO: DataIntegrationLayer service`r`n"
New-File "$root\services\core-engine\src\modules\integration\domain\services\ContextIntegrationLayer.service.ts" "// TODO: ContextIntegrationLayer service`r`n"
New-File "$root\services\core-engine\src\modules\integration\domain\services\ExternalSystemsAdapter.service.ts" "// TODO: ExternalSystemsAdapter service`r`n"
New-File "$root\services\core-engine\src\modules\integration\application\IntegrationOrchestrator.service.ts" "// TODO: IntegrationOrchestrator service`r`n"

# security-governance
New-File "$root\services\core-engine\src\modules\security-governance\SecurityGovernanceModule.ts" "// TODO: SecurityGovernance module`r`n"
New-File "$root\services\core-engine\src\modules\security-governance\security\services\CyberDefenseOrchestrator.service.ts" "// TODO: CyberDefenseOrchestrator service`r`n"
New-File "$root\services\core-engine\src\modules\security-governance\security\services\AccessControlEngine.service.ts" "// TODO: AccessControlEngine service`r`n"
New-File "$root\services\core-engine\src\modules\security-governance\security\services\SecurityPolicyEvaluator.service.ts" "// TODO: SecurityPolicyEvaluator service`r`n"
New-File "$root\services\core-engine\src\modules\security-governance\governance\services\DataCatalog.service.ts" "// TODO: DataCatalog service`r`n"
New-File "$root\services\core-engine\src\modules\security-governance\governance\services\DataQualityEngine.service.ts" "// TODO: DataQualityEngine service`r`n"
New-File "$root\services\core-engine\src\modules\security-governance\governance\services\DataAccessGovernance.service.ts" "// TODO: DataAccessGovernance service`r`n"

# truth-memory-drift
New-File "$root\services\core-engine\src\modules\truth-memory-drift\TruthMemoryDriftModule.ts" "// TODO: TruthMemoryDrift module`r`n"
New-File "$root\services\core-engine\src\modules\truth-memory-drift\gtv\services\GroundTruthValidationEngine.service.ts" "// TODO: GTV engine`r`n"
New-File "$root\services\core-engine\src\modules\truth-memory-drift\smai\services\StateMemoryEngine.service.ts" "// TODO: SMAI state memory engine`r`n"
New-File "$root\services\core-engine\src\modules\truth-memory-drift\sdc-nre\services\StrategicDriftControlEngine.service.ts" "// TODO: SDC-NRE engine`r`n"
New-File "$root\services\core-engine\src\modules\truth-memory-drift\shrsa\services\DigitalVitalityEngine.service.ts" "// TODO: SHRSA engine`r`n"
New-File "$root\services\core-engine\src\modules\truth-memory-drift\application\dto\SubmitGroundTruthFeedback.dto.ts" "// TODO: SubmitGroundTruthFeedback DTO`r`n"
New-File "$root\services\core-engine\src\modules\truth-memory-drift\application\dto\GetDriftStatus.dto.ts" "// TODO: GetDriftStatus DTO`r`n"
New-File "$root\services\core-engine\src\modules\truth-memory-drift\application\usecases\SubmitGroundTruthFeedback.usecase.ts" "// TODO: SubmitGroundTruthFeedback usecase`r`n"
New-File "$root\services\core-engine\src\modules\truth-memory-drift\application\usecases\GetDriftStatus.usecase.ts" "// TODO: GetDriftStatus usecase`r`n"
New-File "$root\services\core-engine\src\modules\truth-memory-drift\application\TruthMemoryDriftService.ts" "// TODO: TruthMemoryDrift service`r`n"

# =========================
# services/api-gateway
# =========================

New-Dir "$root\services\api-gateway\src\routes"
New-Dir "$root\services\api-gateway\src\middlewares"
New-Dir "$root\services\api-gateway\src\controllers"
New-Dir "$root\services\api-gateway\src\clients"

New-File "$root\services\api-gateway\package.json" @'
{
  "name": "@neomind/api-gateway",
  "version": "0.1.0",
  "private": true,
  "description": "NEOMIND API Gateway service.",
  "main": "dist/main.js",
  "scripts": {
    "start": "node dist/main.js",
    "start:dev": "ts-node src/main.ts",
    "build": "tsc -p tsconfig.json",
    "lint": "echo \"no lint configured yet\"",
    "test": "echo \"no tests configured yet\""
  },
  "dependencies": {},
  "devDependencies": {}
}
'@

New-File "$root\services\api-gateway\tsconfig.json" @'
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
'@

New-File "$root\services\api-gateway\.env.example" @'
# API Gateway Env Example

API_GATEWAY_PORT=5200
CORE_ENGINE_BASE_URL=http://localhost:5100
ML_ENGINE_BASE_URL=http://localhost:5300
'@

New-File "$root\services\api-gateway\src\main.ts" "// TODO: API Gateway bootstrap`r`n"
New-File "$root\services\api-gateway\src\clients\CoreEngineClient.ts" "// TODO: CoreEngine HTTP client`r`n"
New-File "$root\services\api-gateway\src\clients\MlEngineClient.ts" "// TODO: ML Engine HTTP client`r`n"

New-File "$root\services\api-gateway\src\routes\incidents.routes.ts" "// TODO: incidents routes`r`n"
New-File "$root\services\api-gateway\src\routes\nsdt.routes.ts" "// TODO: nsdt routes`r`n"
New-File "$root\services\api-gateway\src\routes\decision.routes.ts" "// TODO: decision routes`r`n"
New-File "$root\services\api-gateway\src\routes\identity.routes.ts" "// TODO: identity routes`r`n"
New-File "$root\services\api-gateway\src\routes\auth.routes.ts" "// TODO: auth routes`r`n"
New-File "$root\services\api-gateway\src\routes\truth.routes.ts" "// TODO: truth routes`r`n"

New-File "$root\services\api-gateway\src\middlewares\AuthMiddleware.ts" "// TODO: auth middleware`r`n"
New-File "$root\services\api-gateway\src\middlewares\RequestLoggerMiddleware.ts" "// TODO: request logger middleware`r`n"

New-File "$root\services\api-gateway\src\controllers\IncidentsController.ts" "// TODO: Incidents controller`r`n"
New-File "$root\services\api-gateway\src\controllers\NSDTController.ts" "// TODO: NSDT controller`r`n"
New-File "$root\services\api-gateway\src\controllers\DecisionController.ts" "// TODO: Decision controller`r`n"
New-File "$root\services\api-gateway\src\controllers\IdentityController.ts" "// TODO: Identity controller`r`n"
New-File "$root\services\api-gateway\src\controllers\AuthController.ts" "// TODO: Auth controller`r`n"
New-File "$root\services\api-gateway\src\controllers\TruthController.ts" "// TODO: Truth controller`r`n"

# =========================
# services/simulator
# =========================

New-Dir "$root\services\simulator\src\scenarios"
New-Dir "$root\services\simulator\src\publishers"
New-Dir "$root\services\simulator\src\config"

New-File "$root\services\simulator\package.json" @'
{
  "name": "@neomind/simulator",
  "version": "0.1.0",
  "private": true,
  "description": "NEOMIND data simulator service.",
  "main": "dist/main.js",
  "scripts": {
    "start": "node dist/main.js",
    "start:dev": "ts-node src/main.ts",
    "build": "tsc -p tsconfig.json",
    "lint": "echo \"no lint configured yet\"",
    "test": "echo \"no tests configured yet\""
  },
  "dependencies": {},
  "devDependencies": {}
}
'@

New-File "$root\services\simulator\tsconfig.json" @'
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
'@

New-File "$root\services\simulator\.env.example" @'
# Simulator Env Example

SIMULATOR_TARGET_API=http://localhost:5200
'@

New-File "$root\services\simulator\src\main.ts" "// TODO: Simulator bootstrap`r`n"
New-File "$root\services\simulator\src\scenarios\TrafficScenario.generator.ts" "// TODO: Traffic scenario generator`r`n"
New-File "$root\services\simulator\src\scenarios\CrowdScenario.generator.ts" "// TODO: Crowd scenario generator`r`n"
New-File "$root\services\simulator\src\scenarios\SeasonEventScenario.generator.ts" "// TODO: Season event scenario generator`r`n"
New-File "$root\services\simulator\src\publishers\EventStreamPublisher.ts" "// TODO: Event stream publisher`r`n"
New-File "$root\services\simulator\src\config\SimulatorConfig.ts" "// TODO: Simulator config`r`n"

# =========================
# services/shared-kernel
# =========================

New-Dir "$root\services\shared-kernel\src\types"
New-Dir "$root\services\shared-kernel\src\constants"

New-File "$root\services\shared-kernel\package.json" @'
{
  "name": "@neomind/shared-kernel",
  "version": "0.1.0",
  "private": true,
  "description": "Shared types and constants for NEOMIND.",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "lint": "echo \"no lint configured yet\"",
    "test": "echo \"no tests configured yet\""
  },
  "dependencies": {},
  "devDependencies": {}
}
'@

New-File "$root\services\shared-kernel\tsconfig.json" @'
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
'@

New-File "$root\services\shared-kernel\src\types\CommonDTOs.ts" "// TODO: Common DTOs`r`n"
New-File "$root\services\shared-kernel\src\constants\RiskLevels.ts" "// TODO: Risk level constants`r`n"
New-File "$root\services\shared-kernel\src\constants\StateLevels.ts" "// TODO: State level constants`r`n"

# =========================
# services/ml-engine (Python)
# =========================

New-Dir "$root\services\ml-engine\src\ml_engine\schemas"
New-Dir "$root\services\ml-engine\src\ml_engine\api\v1"
New-Dir "$root\services\ml-engine\src\ml_engine\core"
New-Dir "$root\services\ml-engine\src\ml_engine\models"
New-Dir "$root\services\ml-engine\src\ml_engine\pipelines"
New-Dir "$root\services\ml-engine\src\ml_engine\training\configs"
New-Dir "$root\services\ml-engine\src\ml_engine\training\datasets"
New-Dir "$root\services\ml-engine\src\ml_engine\training\scripts"
New-Dir "$root\services\ml-engine\src\ml_engine\artifacts"
New-Dir "$root\services\ml-engine\src\ml_engine\tests"
New-Dir "$root\services\ml-engine\notebooks"
New-Dir "$root\services\ml-engine\scripts"

New-File "$root\services\ml-engine\pyproject.toml" @'
[project]
name = "neomind-ml-engine"
version = "0.1.0"
description = "NEOMIND ML Engine (Python, FastAPI, ML models)."
requires-python = ">=3.10"
'@

New-File "$root\services\ml-engine\requirements.txt" @'
fastapi
uvicorn
pydantic
numpy
pandas
scikit-learn
torch
torch-geometric
'@

New-File "$root\services\ml-engine\README.md" "# NEOMIND ML Engine`r`n"
New-File "$root\services\ml-engine\.env.example" @'
# ML Engine Env Example

ML_ENGINE_HOST=0.0.0.0
ML_ENGINE_PORT=5300
'@

New-File "$root\services\ml-engine\src\ml_engine\__init__.py" ""
New-File "$root\services\ml-engine\src\ml_engine\config.py" "# TODO: config loader`r`n"
New-File "$root\services\ml-engine\src\ml_engine\logging.py" "# TODO: logging setup`r`n"

New-File "$root\services\ml-engine\src\ml_engine\schemas\__init__.py" ""
New-File "$root\services\ml-engine\src\ml_engine\schemas\base.py" "# TODO: base schemas`r`n"
New-File "$root\services\ml-engine\src\ml_engine\schemas\anomaly.py" "# TODO: anomaly schemas`r`n"
New-File "$root\services\ml-engine\src\ml_engine\schemas\forecast.py" "# TODO: forecast schemas`r`n"
New-File "$root\services\ml-engine\src\ml_engine\schemas\graph.py" "# TODO: graph schemas`r`n"

New-File "$root\services\ml-engine\src\ml_engine\api\__init__.py" ""
New-File "$root\services\ml-engine\src\ml_engine\api\deps.py" "# TODO: dependencies`r`n"
New-File "$root\services\ml-engine\src\ml_engine\api\v1\__init__.py" ""
New-File "$root\services\ml-engine\src\ml_engine\api\v1\health.py" "# TODO: health endpoint`r`n"
New-File "$root\services\ml-engine\src\ml_engine\api\v1\anomaly.py" "# TODO: anomaly endpoint`r`n"
New-File "$root\services\ml-engine\src\ml_engine\api\v1\forecast.py" "# TODO: forecast endpoint`r`n"
New-File "$root\services\ml-engine\src\ml_engine\api\v1\graph_risk.py" "# TODO: graph risk endpoint`r`n"
New-File "$root\services\ml-engine\src\ml_engine\api\v1\models_info.py" "# TODO: models info endpoint`r`n"

New-File "$root\services\ml-engine\src\ml_engine\core\__init__.py" ""
New-File "$root\services\ml-engine\src\ml_engine\core\feature_extraction.py" "# TODO: feature extraction`r`n"
New-File "$root\services\ml-engine\src\ml_engine\core\preprocessing.py" "# TODO: preprocessing`r`n"
New-File "$root\services\ml-engine\src\ml_engine\core\utils.py" "# TODO: utils`r`n"

New-File "$root\services\ml-engine\src\ml_engine\models\__init__.py" ""
New-File "$root\services\ml-engine\src\ml_engine\models\base_model.py" "# TODO: base ML model`r`n"
New-File "$root\services\ml-engine\src\ml_engine\models\one_class_svm_model.py" "# TODO: One-Class SVM model`r`n"
New-File "$root\services\ml-engine\src\ml_engine\models\isolation_forest_model.py" "# TODO: Isolation Forest model`r`n"
New-File "$root\services\ml-engine\src\ml_engine\models\lstm_forecast_model.py" "# TODO: LSTM forecast model`r`n"
New-File "$root\services\ml-engine\src\ml_engine\models\autoencoder_anomaly_model.py" "# TODO: Autoencoder anomaly model`r`n"
New-File "$root\services\ml-engine\src\ml_engine\models\gnn_risk_propagation_model.py" "# TODO: GNN risk propagation model`r`n"
New-File "$root\services\ml-engine\src\ml_engine\models\registry.py" "# TODO: model registry`r`n"

New-File "$root\services\ml-engine\src\ml_engine\pipelines\__init__.py" ""
New-File "$root\services\ml-engine\src\ml_engine\pipelines\anomaly_pipeline.py" "# TODO: anomaly pipeline`r`n"
New-File "$root\services\ml-engine\src\ml_engine\pipelines\forecast_pipeline.py" "# TODO: forecast pipeline`r`n"
New-File "$root\services\ml-engine\src\ml_engine\pipelines\graph_risk_pipeline.py" "# TODO: graph risk pipeline`r`n"

New-File "$root\services\ml-engine\src\ml_engine\training\__init__.py" ""
New-File "$root\services\ml-engine\src\ml_engine\training\configs\__init__.py" ""
New-File "$root\services\ml-engine\src\ml_engine\training\configs\one_class_svm_config.py" "# TODO: One-Class SVM config`r`n"
New-File "$root\services\ml-engine\src\ml_engine\training\configs\isolation_forest_config.py" "# TODO: Isolation Forest config`r`n"
New-File "$root\services\ml-engine\src\ml_engine\training\configs\lstm_forecast_config.py" "# TODO: LSTM forecast config`r`n"
New-File "$root\services\ml-engine\src\ml_engine\training\configs\autoencoder_anomaly_config.py" "# TODO: Autoencoder config`r`n"
New-File "$root\services\ml-engine\src\ml_engine\training\configs\gnn_risk_config.py" "# TODO: GNN risk config`r`n"

New-File "$root\services\ml-engine\src\ml_engine\training\datasets\__init__.py" ""
New-File "$root\services\ml-engine\src\ml_engine\training\datasets\loaders.py" "# TODO: dataset loaders`r`n"
New-File "$root\services\ml-engine\src\ml_engine\training\datasets\transforms.py" "# TODO: dataset transforms`r`n"

New-File "$root\services\ml-engine\src\ml_engine\training\scripts\__init__.py" ""
New-File "$root\services\ml-engine\src\ml_engine\training\scripts\train_one_class_svm.py" "# TODO: train One-Class SVM`r`n"
New-File "$root\services\ml-engine\src\ml_engine\training\scripts\train_isolation_forest.py" "# TODO: train Isolation Forest`r`n"
New-File "$root\services\ml-engine\src\ml_engine\training\scripts\train_lstm_forecast.py" "# TODO: train LSTM`r`n"
New-File "$root\services\ml-engine\src\ml_engine\training\scripts\train_autoencoder.py" "# TODO: train Autoencoder`r`n"
New-File "$root\services\ml-engine\src\ml_engine\training\scripts\train_gnn_risk.py" "# TODO: train GNN`r`n"

New-File "$root\services\ml-engine\src\ml_engine\artifacts\.gitkeep" ""
New-File "$root\services\ml-engine\src\ml_engine\tests\__init__.py" ""
New-File "$root\services\ml-engine\src\ml_engine\tests\test_health_endpoint.py" "# TODO: test health endpoint`r`n"
New-File "$root\services\ml-engine\src\ml_engine\tests\test_anomaly_api.py" "# TODO: test anomaly api`r`n"
New-File "$root\services\ml-engine\src\ml_engine\tests\test_forecast_api.py" "# TODO: test forecast api`r`n"
New-File "$root\services\ml-engine\src\ml_engine\tests\test_graph_risk_api.py" "# TODO: test graph risk api`r`n"
New-File "$root\services\ml-engine\src\ml_engine\tests\test_models_loading.py" "# TODO: test models loading`r`n"

New-File "$root\services\ml-engine\notebooks\EDA_anomaly_events.ipynb" ""
New-File "$root\services\ml-engine\notebooks\EDA_forecast_risk.ipynb" ""
New-File "$root\services\ml-engine\notebooks\EDA_graph_risk.ipynb" ""

New-File "$root\services\ml-engine\scripts\run_dev_server.sh" "#!/bin/bash`r`n# TODO: run uvicorn in dev mode`r`n"
New-File "$root\services\ml-engine\scripts\run_dev_server.bat" "@echo off`r`nREM TODO: run uvicorn in dev mode`r`n"

# =========================
# frontend (Next.js)
# =========================

New-Dir "$root\frontend\app\auth\login"
New-Dir "$root\frontend\app\minister\dashboard"
New-Dir "$root\frontend\app\command-center\dashboard"
New-Dir "$root\frontend\app\field-ops\dashboard"
New-Dir "$root\frontend\app\analyst\dashboard"
New-Dir "$root\frontend\components\layout"
New-Dir "$root\frontend\components\maps"
New-Dir "$root\frontend\components\charts"
New-Dir "$root\frontend\components\tables"
New-Dir "$root\frontend\components\widgets"
New-Dir "$root\frontend\lib"
New-Dir "$root\frontend\styles"
New-Dir "$root\frontend\public"

New-File "$root\frontend\package.json" @'
{
  "name": "@neomind/frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {},
  "devDependencies": {}
}
'@

New-File "$root\frontend\tsconfig.json" @'
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "preserve"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
'@

New-File "$root\frontend\next.config.mjs" "export default { reactStrictMode: true }`r`n"
New-File "$root\frontend\.env.example" @'
FRONTEND_PORT=3000
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:5200
'@

New-File "$root\frontend\app\layout.tsx" "// TODO: root layout`r`n"
New-File "$root\frontend\app\page.tsx" "// TODO: landing or redirect page`r`n"
New-File "$root\frontend\app\auth\login\page.tsx" "// TODO: login page`r`n"
New-File "$root\frontend\app\minister\dashboard\page.tsx" "// TODO: minister dashboard`r`n"
New-File "$root\frontend\app\command-center\dashboard\page.tsx" "// TODO: command-center dashboard`r`n"
New-File "$root\frontend\app\field-ops\dashboard\page.tsx" "// TODO: field-ops dashboard`r`n"
New-File "$root\frontend\app\analyst\dashboard\page.tsx" "// TODO: analyst dashboard`r`n"

New-File "$root\frontend\components\layout\MainShell.tsx" "// TODO: MainShell layout component`r`n"
New-File "$root\frontend\components\maps\NSDTMapView.tsx" "// TODO: NSDT map view component`r`n"
New-File "$root\frontend\components\charts\RiskHeatmap.tsx" "// TODO: Risk heatmap component`r`n"
New-File "$root\frontend\components\tables\IncidentsTable.tsx" "// TODO: Incidents table component`r`n"
New-File "$root\frontend\components\widgets\PredictionPanel.tsx" "// TODO: Prediction panel component`r`n"

New-File "$root\frontend\lib\apiClient.ts" "// TODO: API client`r`n"
New-File "$root\frontend\lib\authClient.ts" "// TODO: Auth client`r`n"

New-File "$root\frontend\styles\globals.css" "/* TODO: global styles */`r`n"
New-File "$root\frontend\styles\theme.css" "/* TODO: theme styles */`r`n"

New-File "$root\frontend\public\favicon.ico" ""
New-File "$root\frontend\public\logo-neomind.svg" ""

# =========================
# infra
# =========================

New-Dir "$root\infra\k8s"

New-File "$root\infra\docker-compose.yml" @'
version: "3.9"
services:
  core-engine:
    image: neomind-core-engine
    ports:
      - "5100:5100"
  api-gateway:
    image: neomind-api-gateway
    ports:
      - "5200:5200"
  frontend:
    image: neomind-frontend
    ports:
      - "3000:3000"
'@

New-File "$root\infra\Dockerfile.core-engine" "# TODO: Core engine Dockerfile`r`n"
New-File "$root\infra\Dockerfile.api-gateway" "# TODO: API gateway Dockerfile`r`n"
New-File "$root\infra\Dockerfile.frontend" "# TODO: Frontend Dockerfile`r`n"

New-File "$root\infra\k8s\core-engine-deployment.yaml" "# TODO: core-engine k8s deployment`r`n"
New-File "$root\infra\k8s\api-gateway-deployment.yaml" "# TODO: api-gateway k8s deployment`r`n"
New-File "$root\infra\k8s\frontend-deployment.yaml" "# TODO: frontend k8s deployment`r`n"

# =========================
# scripts & tests
# =========================

New-File "$root\scripts\seed_simulation_data.ts" "// TODO: seed simulation data script`r`n"
New-File "$root\scripts\run_local_env.ps1" "# TODO: run full local environment`r`n"
New-File "$root\scripts\migrate_db.ts" "// TODO: database migration runner`r`n"

New-Dir "$root\tests\unit"
New-Dir "$root\tests\integration"
New-File "$root\tests\unit\.gitkeep" ""
New-File "$root\tests\integration\.gitkeep" ""

Write-Host "NEOMIND structure initialization completed."
