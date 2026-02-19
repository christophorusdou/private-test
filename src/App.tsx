import { useState } from "react"
import { FilterButton, type FilterOption } from "@/components/FilterButton"

const dayUseOptions: FilterOption[] = [
  { id: "shelter", label: "Shelter" },
  { id: "picnic", label: "Picnic area" },
  { id: "playground", label: "Playground" },
  { id: "washroom", label: "Washroom" },
  { id: "boat-launch", label: "Boat launch" },
  { id: "beach", label: "Beach" },
  { id: "fishing", label: "Fishing" },
]

const activitiesOptions: FilterOption[] = [
  { id: "hiking", label: "Hiking" },
  { id: "biking", label: "Biking" },
  { id: "swimming", label: "Swimming" },
  { id: "kayaking", label: "Kayaking" },
  { id: "rock-climbing", label: "Rock climbing" },
  { id: "birdwatching", label: "Birdwatching" },
]

const campingOptions: FilterOption[] = [
  { id: "tent", label: "Tent camping" },
  { id: "rv", label: "RV camping" },
  { id: "cabin", label: "Cabin" },
  { id: "yurt", label: "Yurt" },
  { id: "backcountry", label: "Backcountry" },
]

function App() {
  const [dayUseSelected, setDayUseSelected] = useState<string[]>([
    "shelter",
    "picnic",
  ])
  const [activitiesSelected, setActivitiesSelected] = useState<string[]>([])
  const [campingSelected, setCampingSelected] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          Park Finder
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Filter parks by activities, camping, and day use options.
        </p>

        <div className="flex flex-wrap gap-3">
          <FilterButton
            label="Day Use"
            options={dayUseOptions}
            selectedIds={dayUseSelected}
            onChange={setDayUseSelected}
            searchPlaceholder="Search day use options"
          />
          <FilterButton
            label="Activities"
            options={activitiesOptions}
            selectedIds={activitiesSelected}
            onChange={setActivitiesSelected}
          />
          <FilterButton
            label="Camping & Lodging"
            options={campingOptions}
            selectedIds={campingSelected}
            onChange={setCampingSelected}
          />
        </div>

        {/* Display current selections */}
        <div className="mt-8 rounded-lg border bg-card p-4">
          <h2 className="mb-2 text-sm font-semibold text-foreground">
            Active Filters
          </h2>
          <pre className="text-xs text-muted-foreground">
            {JSON.stringify(
              {
                dayUse: dayUseSelected,
                activities: activitiesSelected,
                camping: campingSelected,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default App
