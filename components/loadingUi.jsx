import { Loader2 } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
        <h2 className="mt-4 text-xl font-semibold">Loading products...</h2>
        <p className="mt-2 text-muted-foreground">Please wait while we fetch the latest products for you.</p>
      </div>
    </div>
  )
}

