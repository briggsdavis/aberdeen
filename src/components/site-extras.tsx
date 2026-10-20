import { Heart } from "@phosphor-icons/react"
import { useMutation } from "convex/react"
import { useState } from "react"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"

export function MenuLikeButton({
  initialCount,
  itemId,
  itemName,
}: {
  initialCount?: number
  itemId?: string
  itemName: string
}) {
  return itemId ? (
    <StoredMenuLikeButton
      initialCount={initialCount ?? 0}
      itemId={itemId as Id<"menuItems">}
      itemName={itemName}
    />
  ) : (
    <LocalMenuLikeButton itemName={itemName} />
  )
}

function LocalMenuLikeButton({ itemName }: { itemName: string }) {
  const key = `aberdeen-liked-${itemName}`
  const [liked, setLiked] = useState(() => sessionStorage.getItem(key) === "true")
  const [count, setCount] = useState(() => 12 + (itemName.length % 9))

  function handleClick() {
    if (liked) return
    sessionStorage.setItem(key, "true")
    setLiked(true)
    setCount((current) => current + 1)
  }

  return (
    <button
      aria-label={`Like ${itemName}`}
      aria-pressed={liked}
      className={`group flex h-9 w-16 shrink-0 items-center justify-center gap-1.5 border px-2 font-utility text-sm transition duration-[480ms] ${
        liked
          ? "border-aberdeen-blue bg-aberdeen-blue text-oyster-white"
          : "border-current bg-transparent hover:border-aberdeen-blue hover:bg-aberdeen-blue hover:text-oyster-white"
      }`}
      onClick={handleClick}
      type="button"
    >
      <Heart
        aria-hidden="true"
        className="transition-transform group-hover:scale-110"
        size={16}
        weight={liked ? "fill" : "regular"}
      />
      <span>{count}</span>
    </button>
  )
}

function StoredMenuLikeButton({
  initialCount,
  itemId,
  itemName,
}: {
  initialCount: number
  itemId: Id<"menuItems">
  itemName: string
}) {
  const likeItem = useMutation(api.menus.likeItem)
  const key = `aberdeen-liked-menu-item-${itemId}`
  const [liked, setLiked] = useState(() => localStorage.getItem(key) === "true")
  const [count, setCount] = useState(initialCount)

  function handleClick() {
    if (liked) return
    localStorage.setItem(key, "true")
    setLiked(true)
    setCount((current) => current + 1)
    void likeItem({ id: itemId }).catch(() => {
      localStorage.removeItem(key)
      setLiked(false)
      setCount((current) => Math.max(initialCount, current - 1))
    })
  }

  return (
    <button
      aria-label={`Like ${itemName}`}
      aria-pressed={liked}
      className={`group flex h-9 w-16 shrink-0 items-center justify-center gap-1.5 border px-2 font-utility text-sm transition duration-[480ms] ${
        liked
          ? "border-aberdeen-blue bg-aberdeen-blue text-oyster-white"
          : "border-current bg-transparent hover:border-aberdeen-blue hover:bg-aberdeen-blue hover:text-oyster-white"
      }`}
      onClick={handleClick}
      type="button"
    >
      <Heart
        aria-hidden="true"
        className="transition-transform group-hover:scale-110"
        size={16}
        weight={liked ? "fill" : "regular"}
      />
      <span>{count}</span>
    </button>
  )
}
