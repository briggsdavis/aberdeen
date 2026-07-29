import { useParams } from "react-router"
import {
  MenuImageSection,
  MenuPageHero,
  MenuPairSection,
  MenuReservation,
} from "../components/menu-sections"
import { useCmsRuntime } from "../lib/cms-runtime"
import { StandardBeveragesMenuPage } from "./menu-beverages"
import { StandardFoodMenuPage } from "./menu-food"
import { StandardSpiritsMenuPage } from "./menu-spirits"
import NotFoundPage from "./not-found"

function legacyPage(slug: string) {
  if (slug === "food") return <StandardFoodMenuPage />
  if (slug === "spirits") return <StandardSpiritsMenuPage />
  if (slug === "beverages") return <StandardBeveragesMenuPage />
  return <NotFoundPage />
}

export default function DynamicMenuPage() {
  const { slug = "" } = useParams()
  const { backendEnabled, menu, menuPages } = useCmsRuntime()

  if (!backendEnabled) return legacyPage(slug)

  if (menu === undefined || menuPages === undefined) {
    return <div className="min-h-svh animate-pulse bg-oyster-white" />
  }

  if (!menu) return legacyPage(slug)

  return (
    <div className="page-shell">
      <MenuPageHero
        activePath={`/menu/${menu.slug}`}
        alt={`${menu.title} menu hero`}
        description={menu.description}
        image={menu.heroImage ?? ""}
        menuPages={menuPages}
        title={menu.title}
        usePageOverride={false}
      />
      {menu.sections.map((section) => {
        if (section.layout === "paired") {
          const first = section.groups[0]
          const second = section.groups[1]
          if (!first || !second) return null
          return (
            <MenuPairSection
              background={section.background}
              first={first}
              key={section._id}
              map={section.mapImage}
              second={second}
            />
          )
        }

        const group = section.groups[0]
        if (!group || !section.image) return null
        const postcards = [
          section.showPostcardOne ? section.postcards[0] : null,
          section.showPostcardTwo ? section.postcards[1] : null,
          section.showPostcardThree ? section.postcards[2] : null,
        ].filter((image): image is string => Boolean(image))

        return (
          <MenuImageSection
            alt={`${group.title} menu section`}
            background={section.background}
            caption={section.imageCaption}
            group={group}
            image={section.image}
            imagePosition={section.layout === "imageLeft" ? "left" : "right"}
            key={section._id}
            map={section.mapImage}
            postcards={postcards}
          />
        )
      })}
      <MenuReservation
        copy={`Book a table and explore the ${menu.title.toLowerCase()} menu with us.`}
        label={menu.title}
        number={String((menuPages.findIndex((page) => page._id === menu._id) + 1) || 1).padStart(
          2,
          "0",
        )}
        title="Come hungry, stay for the light."
      />
    </div>
  )
}
