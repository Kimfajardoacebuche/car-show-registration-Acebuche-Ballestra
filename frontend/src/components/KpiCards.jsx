
import KpiCard from "./KpiCard";

function KpiCards({ summary }) {
  const cards = [
    {
      title: "Total Registrations",
      value: summary?.totalRegistrations ?? 0,
      description: "All registered participants",
      icon: "👥",
    },
    {
      title: "Confirmed",
      value: summary?.confirmed ?? 0,
      description: "Confirmed registrations",
      icon: "✅",
    },
    {
      title: "Checked In",
      value: summary?.checkedIn ?? 0,
      description: "Participants who arrived",
      icon: "🚗",
    },
    {
      title: "Pending",
      value: summary?.pending ?? 0,
      description: "Awaiting confirmation",
      icon: "⏳",
    },
    {
      title: "Cancelled",
      value: summary?.cancelled ?? 0,
      description: "Cancelled registrations",
      icon: "❌",
    },
  ];

  return (
    <section className="kpi-grid">
      {cards.map((card) => (
        <KpiCard
          key={card.title}
          title={card.title}
          value={card.value}
          description={card.description}
          icon={card.icon}
        />
      ))}
    </section>
  );
}

export default KpiCards;
