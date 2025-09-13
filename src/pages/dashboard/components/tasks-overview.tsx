import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { getTaskMetrics } from '~/data/dashboard-data'

export const TasksOverview = () => {
  const tasksData = getTaskMetrics()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Tasks Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tasksData.map((task) => (
            <div
              key={task.label}
              className="flex items-center justify-between rounded-lg bg-background-secondary p-4 transition-colors hover:bg-background-tertiary"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`h-4 w-4 rounded-full ${task.color} shadow-sm`}
                ></div>
                <div>
                  <div className="text-sm font-medium text-base-gray-300">
                    {task.label}
                  </div>
                  <div className="text-xs text-base-gray-400">Tasks</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground sm:text-3xl">
                  {task.count.toLocaleString()}
                </div>
                <div className="text-xs text-base-gray-400">
                  {task.label === 'Completed'
                    ? 'Success'
                    : task.label === 'Dropped'
                      ? 'Failed'
                      : 'Active'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
