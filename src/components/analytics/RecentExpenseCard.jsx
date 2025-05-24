import { cn } from "@/lib/utils";
import { formatDistance, subDays } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentExpenseCard({
  activities,
  className,
  primaryColor,
  title = "Recent Expense",
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
          <div className="space-y-6 px-2">
            {activities?.data?.slice(0, 10).map((activity) => (
              <div key={activity.id} className="relative pl-6">
                {/* Timeline connector */}
                <div className="absolute top-0 left-0 w-px h-full bg-neutral-200 dark:bg-neutral-800" />

                {/* Timeline dot */}
                <div
                  className="absolute top-1 left-0 w-2 h-2 rounded-full -translate-x-[3px]"
                  style={{ backgroundColor: primaryColor }}
                />

                {/* Content */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">
                      {activity?.category.charAt(0).toUpperCase() +
                        activity.category.slice(1)}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {/* {new Date(activity?.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )} */}
                      {formatDistance(
                        subDays(new Date(activity.createdAt), 3),
                        new Date(),
                        { addSuffix: true }
                      )}
                    </span>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {activity?.description}
                  </span>

                  <p className="text-sm text-yellow-600 mb-2">
                    {`${activity.amount} Tk`}
                  </p>

                  {activity.issuedBy && (
                    <span
                      // className={cn(
                      //   "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      //   activity.status === "completed" &&
                      //     ,
                      //   activity.status === "pending" &&
                      //     "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                      //   activity.status === "failed" &&
                      //     "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      // )}
                      className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 p-2 rounded-full text-sm"
                    >
                      {activity?.issuedBy.name}
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
