import Card from "@/components/ui/Card";

const items = [
  {
    title: "Sample Announcement",
    date: "May 2026",
    body: "This is a placeholder announcement for the demo portal.",
  },
  {
    title: "Emergency Update (Demo)",
    date: "May 2026",
    body: "In production, emergency notices can be posted here by authorized staff.",
  },
];

export default function AnnouncementsPage() {
  return (
    <div className="space-y-4">
      <Card title="Announcements">
        <p className="text-sm text-gray-600">Official announcements and community updates.</p>
      </Card>

      <div className="grid gap-4">
        {items.map((x) => (
          <Card key={x.title} title={x.title}>
            <div className="text-xs text-gray-500">{x.date}</div>
            <p className="mt-2 text-sm text-gray-700">{x.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
