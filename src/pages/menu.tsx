import { useParams } from "react-router"
import {
  MenuImageSection,
  MenuPageHero,
  MenuPairSection,
  MenuReservation,
} from "../components/menu-sections"
import { useMenuData } from "../lib/public-data"
import NotFoundPage from "./not-found"

export default function MenuPage() {
  const { slug = "" } = useParams()
  const { menu, navigation, ready } = useMenuData(slug)

  if (!ready) {
    return <div className="min-h-svh animate-pulse bg-oyster-white" />
  }

  if (!menu) return <NotFoundPage />

  return (
    <div className="page-shell">
      <MenuPageHero activePath={`/menu/${menu.slug}`} menuPages={navigation} title={menu.title} />
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
        ].flatMap((postcard) =>
          postcard?.image ? [{ image: postcard.image, message: postcard.message }] : [],
        )

        return (
          <MenuImageSection
            alt={`${group.title} menu section`}
            background={section.background}
            group={group}
            image={section.image}
            imagePanelDescription={section.imageCaption || menu.description}
            imagePosition={section.layout === "imageLeft" ? "left" : "right"}
            key={section._id}
            postcards={postcards}
          />
        )
      })}
      <MenuReservation
        copy={`Book a table and explore the ${menu.title.toLowerCase()} menu with us.`}
        label={menu.title}
        number={String(navigation.findIndex((page) => page._id === menu._id) + 1 || 1).padStart(
          2,
          "0",
        )}
        title="Come hungry, stay for the light."
      />
    </div>
  )
}
