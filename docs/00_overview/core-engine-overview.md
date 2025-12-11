# NEOMIND Core Engine – Overview

هذه الوثيقة تشرح باختصار مكوّن **المحرّك السيادي المركزي للمنظومة (Core Engine)**
وواجهة الـ API الأساسية التي يستخدمها الديمو والواجهة الأمامية.

---

## 1. نظرة عامة

- **اللغة / الإطار:** Node.js + NestJS (TypeScript)
- **نوع الخدمة:** HTTP REST API (Skeleton Demo)
- **المنفذ الافتراضي:** `5100`
- **نقطة الدخول:**  
  `services/core-engine/src/app/main.ts`

المحرّك يجمع طبقات الاستخبارات والسيادة في نقطة مركزية واحدة،
ويقدّم واجهات جاهزة للاستهلاك من واجهة NEOMIND الأمامية.

---

## 2. الوحدات (Modules)

داخل المسار:

`services/core-engine/src/modules`

تم تعريف الوحدات التالية:

1. **PSIC – Pattern & State Intelligence Core**
   - تحليل الأنماط وحالة المخاطر حسب المناطق.
   - ملفات رئيسية:
     - `psic/PSICModule.ts`
     - `psic/PSICController.ts`
     - `psic/PSICService.ts`

2. **NSDT – National State Digital Twin**
   - التوأم الرقمي الوطني لحالة الدولة.
   - ملفات رئيسية:
     - `nsdt/NSDTModule.ts`
     - `nsdt/NSDTController.ts`
     - `nsdt/NSDTService.ts`

3. **Context Simulation**
   - محاكاة السياقات متعددة الأبعاد.
   - ملفات رئيسية:
     - `context-simulation/ContextSimulationModule.ts`
     - `context-simulation/ContextSimulationController.ts`
     - `context-simulation/context/domain/services/*.ts`

4. **Decision & Command (C4S)**
   - منظومة القرار والقيادة (C4S).
   - ملفات رئيسية:
     - `decision-c4s/DecisionC4SModule.ts`
     - `decision-c4s/DecisionC4SController.ts`
     - `decision-c4s/application/DecisionService.ts`

5. **Identity & Behavior**
   - هوية وسلوك الأفراد / الكيانات.
   - ملفات رئيسية:
     - `identity-behavior/IdentityBehaviorModule.ts`
     - `identity-behavior/IdentityBehaviorController.ts`

6. **Health**
   - فحص جاهزية الخدمة الأساسية.
   - ملفات رئيسية:
     - `app/health.controller.ts`
     - `app/AppModule.ts`

---

## 3. نقاط الواجهة (API Endpoints)

### 3.1. Health

- **GET** `/health`  
  يعيد حالة الكور إنجن.

**Response (مثال):**
```json
{
  "status": "ok",
  "service": "neomind-core-engine",
  "timestamp": "2025-12-10T14:50:00.000Z"
}
