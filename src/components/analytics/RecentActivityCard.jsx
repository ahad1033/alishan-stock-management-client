import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export function RecentActivityCard({
  activities,
  className,
  title = "Recent Activity",
}) {
  return (
    <Card
      className={cn(
        "border-neutral-200/20 dark:border-neutral-800/30",
        "bg-white/10 dark:bg-black/10 backdrop-blur-lg",
        className
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="relative pl-6">
                {/* Timeline connector */}
                <div className="absolute top-0 left-0 w-px h-full bg-neutral-200 dark:bg-neutral-800" />

                {/* Timeline dot */}
                <div className="absolute top-1 left-0 w-2 h-2 rounded-full bg-[#B38A2D] -translate-x-[3px]" />

                {/* Content */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{activity.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  {activity.status && (
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        activity.status === "completed" &&
                          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                        activity.status === "pending" &&
                          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                        activity.status === "failed" &&
                          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      )}
                    >
                      {activity.status.charAt(0).toUpperCase() +
                        activity.status.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
