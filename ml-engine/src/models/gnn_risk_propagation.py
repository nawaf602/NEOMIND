"""
gnn_risk_propagation.py

هيكل مبسط (Skeleton) لفكرة "Graph Neural Network"
لنشر/انتشار المخاطر عبر شبكة من المناطق (Zones).

⚠ ملاحظة:
هذا ليس GNN حقيقي بل تقريب لفكرة:
- كل Zone عقدة (Node)
- العلاقات بين المناطق (جوار جغرافي / ترابط سلوكي) حواف (Edges)
- نجري عدة دورات انتشار (Propagation) لدرجات المخاطر بين العقد.

يمكن لاحقاً استبدال هذه الطبقة بنموذج GNN حقيقي (GCN / GraphSAGE / GAT).
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, List, Mapping


@dataclass
class GraphRiskPropagationModel:
    """
    نموذج مبسط لانتشار المخاطر على شبكة (Graph) من المناطق.

    attributes:
    - adjacency: قاموس يربط كل منطقة بقائمة من الجيران مع أوزان العلاقة.
                 مثال:
                 {
                   "ZONE-RIYADH-001": {"ZONE-RIYADH-002": 0.8, "ZONE-MAKKAH-001": 0.2},
                   "ZONE-RIYADH-002": {"ZONE-RIYADH-001": 0.8},
                   ...
                 }
    - damping: معامل تخميد (كم نحافظ من المخاطر المحلية مقارنة بالمخاطر القادمة من الجيران)
    - steps: عدد دورات الانتشار (Propagation Steps)
    """

    adjacency: Dict[str, Dict[str, float]] = field(default_factory=dict)
    damping: float = 0.6
    steps: int = 3

    def propagate(self, initial_risk: Mapping[str, float]) -> Dict[str, float]:
        """
        يجري انتشار المخاطر على الشبكة لعدد من الخطوات.

        :param initial_risk: قاموس يحتوي على درجة المخاطر الأولية لكل منطقة.
        :return: قاموس بدرجات المخاطر بعد الانتشار.
        """
        # نبدأ بنسخة من المخاطر الأولية
        current = dict(initial_risk)

        # نتأكد أن كل عقدة في الـ adjacency لها قيمة ابتدائية ولو صفر
        for node in self.adjacency.keys():
            current.setdefault(node, 0.0)

        for step in range(self.steps):
            new_values: Dict[str, float] = {}

            for node, neighbors in self.adjacency.items():
                local_risk = current.get(node, 0.0)

                # نجمع مساهمات الجيران
                neighbor_contrib = 0.0
                total_weight = 0.0

                for neighbor, weight in neighbors.items():
                    neighbor_risk = current.get(neighbor, 0.0)
                    neighbor_contrib += neighbor_risk * weight
                    total_weight += weight

                if total_weight > 0:
                    # متوسط مخاطر الجيران
                    neighbor_avg = neighbor_contrib / total_weight
                else:
                    neighbor_avg = 0.0

                # المعادلة:
                # risk_next = damping * local_risk + (1 - damping) * neighbor_avg
                updated = self.damping * local_risk + (1.0 - self.damping) * neighbor_avg
                new_values[node] = float(updated)

            # نحدث المخاطر بعد دورة الانتشار
            current = new_values

        return current


# تجربة محلية
if __name__ == "__main__":
    # نعرّف شبكة بسيطة من 3 مناطق:
    # - الرياض 1 متصلة بالرياض 2 ومكة 1
    # - الرياض 2 متصلة بالرياض 1 فقط
    # - مكة 1 متصلة بالرياض 1 فقط
    adjacency = {
        "ZONE-RIYADH-001": {"ZONE-RIYADH-002": 0.8, "ZONE-MAKKAH-001": 0.4},
        "ZONE-RIYADH-002": {"ZONE-RIYADH-001": 0.8},
        "ZONE-MAKKAH-001": {"ZONE-RIYADH-001": 0.4},
    }

    # درجات مخاطر أولية (مثال):
    initial_risk = {
        "ZONE-RIYADH-001": 0.9,   # منطقة عالية المخاطر
        "ZONE-RIYADH-002": 0.2,   # منخفضة
        "ZONE-MAKKAH-001": 0.4,   # متوسطة
    }

    model = GraphRiskPropagationModel(adjacency=adjacency, damping=0.6, steps=4)
    final_risk = model.propagate(initial_risk)

    print("Initial risk:", initial_risk)
    print("Final propagated risk:", final_risk)
