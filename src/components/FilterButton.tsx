import { useState, useMemo } from "react"
import { ChevronDown, Search, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface FilterOption {
  id: string
  label: string
}

interface FilterButtonProps {
  label: string
  options: FilterOption[]
  selectedIds?: string[]
  onChange?: (selectedIds: string[]) => void
  searchPlaceholder?: string
}

export function FilterButton({
  label,
  options,
  selectedIds = [],
  onChange,
  searchPlaceholder = "Search",
}: FilterButtonProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const selectedOptions = useMemo(
    () => options.filter((opt) => selectedIds.includes(opt.id)),
    [options, selectedIds]
  )

  const filteredOptions = useMemo(
    () =>
      options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      ),
    [options, search]
  )

  const handleToggle = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((s) => s !== id)
      : [...selectedIds, id]
    onChange?.(next)
  }

  const handleRemove = (id: string) => {
    onChange?.(selectedIds.filter((s) => s !== id))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Filter map by ${label.toLowerCase()}`}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            "bg-white text-foreground shadow-sm hover:bg-accent",
            open && "ring-2 ring-primary/30 border-primary"
          )}
        >
          {label}
          {selectedIds.length > 0 && (
            <Badge className="ml-1 h-5 min-w-5 justify-center rounded-full px-1.5 text-xs">
              {selectedIds.length}
            </Badge>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              open && "rotate-180"
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-0" align="start" sideOffset={8}>
        {/* Search input */}
        <div className="flex items-center gap-2 border-b px-3 py-2">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            aria-label={`Search ${label.toLowerCase()} options`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Selected chips */}
        {selectedOptions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 border-b px-3 py-2">
            {selectedOptions.map((opt) => (
              <span
                key={opt.id}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
              >
                {opt.label}
                <button
                  type="button"
                  onClick={() => handleRemove(opt.id)}
                  aria-label={`Remove selected option ${opt.label}`}
                  className="rounded-full p-0.5 hover:bg-primary/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Checkbox list */}
        <ul className="max-h-56 overflow-y-auto py-1" role="listbox">
          {filteredOptions.length === 0 && (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              No options found
            </li>
          )}
          {filteredOptions.map((opt) => {
            const checked = selectedIds.includes(opt.id)
            return (
              <li key={opt.id}>
                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-accent",
                    checked && "bg-accent/50"
                  )}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => handleToggle(opt.id)}
                  />
                  <span>{opt.label}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
