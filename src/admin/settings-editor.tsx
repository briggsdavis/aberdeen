import { ArrowDown, ArrowUp, Plus, Trash } from "@phosphor-icons/react"
import { useMutation, useQuery } from "convex/react"
import { useCallback, useEffect, useState } from "react"
import { api } from "../../convex/_generated/api"
import {
  Field,
  Input,
  PageHeading,
  PrimaryButton,
  SecondaryButton,
  Textarea,
  inputClass,
} from "./ui"

type ContactRow = { label: string; value: string; note: string }
type HoursRow = { label: string; value: string }
type SocialRow = { platform: string; url: string }
const platforms = ["Instagram", "Facebook", "TikTok", "X", "YouTube", "LinkedIn"]

function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const target = index + direction
  if (target < 0 || target >= items.length) return items
  const next = [...items]
  ;[next[index], next[target]] = [next[target]!, next[index]!]
  return next
}

function RowActions({
  index,
  count,
  onMove,
  onRemove,
}: {
  index: number
  count: number
  onMove: (direction: -1 | 1) => void
  onRemove: () => void
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        aria-label="Move up"
        className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-aberdeen-blue disabled:opacity-25"
        disabled={index === 0}
        onClick={() => onMove(-1)}
        type="button"
      >
        <ArrowUp size={15} />
      </button>
      <button
        aria-label="Move down"
        className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-aberdeen-blue disabled:opacity-25"
        disabled={index === count - 1}
        onClick={() => onMove(1)}
        type="button"
      >
        <ArrowDown size={15} />
      </button>
      <button
        aria-label="Remove"
        className="rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
        onClick={onRemove}
        type="button"
      >
        <Trash size={15} />
      </button>
    </div>
  )
}

export default function SettingsEditor() {
  const data = useQuery(api.site.getAdminSettings)
  const saveGlobal = useMutation(api.site.saveGlobal)
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [contacts, setContacts] = useState<ContactRow[]>([])
  const [hours, setHours] = useState<HoursRow[]>([])
  const [socials, setSocials] = useState<SocialRow[]>([])
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!data || dirty) return
    setSettings(data.settings)
    setContacts(data.contactDetails.map(({ label, value, note }) => ({ label, value, note })))
    setHours(data.openingHours.map(({ label, value }) => ({ label, value })))
    setSocials(data.socialLinks.map(({ platform, url }) => ({ platform, url })))
  }, [data, dirty])

  const touch = useCallback(() => {
    setDirty(true)
    setSaved(false)
  }, [])

  const save = useCallback(async () => {
    setSaving(true)
    try {
      await saveGlobal({
        settings,
        contactDetails: contacts,
        openingHours: hours,
        socialLinks: socials,
      })
      setDirty(false)
      setSaved(true)
      window.setTimeout(() => setSaved(false), 2400)
    } finally {
      setSaving(false)
    }
  }, [contacts, hours, saveGlobal, settings, socials])

  const updateSetting = (key: string, value: string) => {
    setSettings((current) => ({ ...current, [key]: value }))
    touch()
  }

  return (
    <div className="grid gap-6">
      <PageHeading
        actions={
          <PrimaryButton disabled={!dirty || saving} onClick={() => void save()}>
            {saving ? "Saving…" : saved ? "Saved" : "Save changes"}
          </PrimaryButton>
        }
        description="Footer content, contact information, opening hours, map details, and social links used throughout the site."
        title="Footer and Global"
      />
      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Primary details</h2>
          <div className="mt-5 grid gap-4">
            <Field label="Address">
              <Textarea
                className="min-h-20"
                onChange={(event) => updateSetting("address", event.target.value)}
                value={settings.address ?? ""}
              />
            </Field>
            <Field hint="Used to center the embedded map." label="Map location">
              <Input
                onChange={(event) => updateSetting("mapLocation", event.target.value)}
                value={settings.mapLocation ?? ""}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone">
                <Input
                  onChange={(event) => updateSetting("phone", event.target.value)}
                  value={settings.phone ?? ""}
                />
              </Field>
              <Field label="Email">
                <Input
                  onChange={(event) => updateSetting("email", event.target.value)}
                  type="email"
                  value={settings.email ?? ""}
                />
              </Field>
            </div>
            <Field label="Reservation link">
              <Input
                onChange={(event) => updateSetting("reservationUrl", event.target.value)}
                value={settings.reservationUrl ?? ""}
              />
            </Field>
          </div>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Footer</h2>
          <div className="mt-5 grid gap-4">
            <Field label="Footer tagline">
              <Textarea
                className="min-h-24"
                onChange={(event) => updateSetting("footerTagline", event.target.value)}
                value={settings.footerTagline ?? ""}
              />
            </Field>
            <Field label="Copyright text">
              <Input
                onChange={(event) => updateSetting("footerCopyright", event.target.value)}
                value={settings.footerCopyright ?? ""}
              />
            </Field>
          </div>
        </section>
      </div>
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Contact details</h2>
            <p className="mt-1 text-xs text-slate-500">
              Add any details you want displayed on the contact page.
            </p>
          </div>
          <SecondaryButton
            onClick={() => {
              setContacts((current) => [...current, { label: "Contact", value: "", note: "" }])
              touch()
            }}
          >
            <Plus size={16} /> Add detail
          </SecondaryButton>
        </div>
        <div className="mt-5 grid gap-3">
          {contacts.map((contact, index) => (
            <div
              className="grid gap-3 rounded-lg border border-slate-200 p-4 lg:grid-cols-[0.5fr_1fr_1.2fr_auto]"
              key={index}
            >
              <Input
                aria-label="Contact label"
                onChange={(event) => {
                  setContacts((current) =>
                    current.map((row, rowIndex) =>
                      rowIndex === index ? { ...row, label: event.target.value } : row,
                    ),
                  )
                  touch()
                }}
                placeholder="Label"
                value={contact.label}
              />
              <Input
                aria-label="Contact value"
                onChange={(event) => {
                  setContacts((current) =>
                    current.map((row, rowIndex) =>
                      rowIndex === index ? { ...row, value: event.target.value } : row,
                    ),
                  )
                  touch()
                }}
                placeholder="Value"
                value={contact.value}
              />
              <Input
                aria-label="Contact note"
                onChange={(event) => {
                  setContacts((current) =>
                    current.map((row, rowIndex) =>
                      rowIndex === index ? { ...row, note: event.target.value } : row,
                    ),
                  )
                  touch()
                }}
                placeholder="Supporting note"
                value={contact.note}
              />
              <RowActions
                count={contacts.length}
                index={index}
                onMove={(direction) => {
                  setContacts((current) => moveItem(current, index, direction))
                  touch()
                }}
                onRemove={() => {
                  setContacts((current) => current.filter((_, rowIndex) => rowIndex !== index))
                  touch()
                }}
              />
            </div>
          ))}
        </div>
      </section>
      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold text-slate-900">Opening hours</h2>
            <SecondaryButton
              onClick={() => {
                setHours((current) => [...current, { label: "Day", value: "" }])
                touch()
              }}
            >
              <Plus size={16} /> Add hours
            </SecondaryButton>
          </div>
          <div className="mt-5 grid gap-3">
            {hours.map((row, index) => (
              <div
                className="grid grid-cols-[1fr_1fr_auto] gap-2 rounded-lg border border-slate-200 p-3"
                key={index}
              >
                <Input
                  aria-label="Days"
                  onChange={(event) => {
                    setHours((current) =>
                      current.map((item, rowIndex) =>
                        rowIndex === index ? { ...item, label: event.target.value } : item,
                      ),
                    )
                    touch()
                  }}
                  value={row.label}
                />
                <Input
                  aria-label="Hours"
                  onChange={(event) => {
                    setHours((current) =>
                      current.map((item, rowIndex) =>
                        rowIndex === index ? { ...item, value: event.target.value } : item,
                      ),
                    )
                    touch()
                  }}
                  value={row.value}
                />
                <RowActions
                  count={hours.length}
                  index={index}
                  onMove={(direction) => {
                    setHours((current) => moveItem(current, index, direction))
                    touch()
                  }}
                  onRemove={() => {
                    setHours((current) => current.filter((_, rowIndex) => rowIndex !== index))
                    touch()
                  }}
                />
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold text-slate-900">Social media</h2>
            <SecondaryButton
              onClick={() => {
                setSocials((current) => [...current, { platform: "Instagram", url: "" }])
                touch()
              }}
            >
              <Plus size={16} /> Add social
            </SecondaryButton>
          </div>
          <div className="mt-5 grid gap-3">
            {socials.map((row, index) => (
              <div
                className="grid grid-cols-[0.75fr_1.25fr_auto] gap-2 rounded-lg border border-slate-200 p-3"
                key={index}
              >
                <select
                  aria-label="Social platform"
                  className={inputClass}
                  onChange={(event) => {
                    setSocials((current) =>
                      current.map((item, rowIndex) =>
                        rowIndex === index ? { ...item, platform: event.target.value } : item,
                      ),
                    )
                    touch()
                  }}
                  value={row.platform}
                >
                  {platforms.map((platform) => (
                    <option key={platform}>{platform}</option>
                  ))}
                </select>
                <Input
                  aria-label="Social URL"
                  onChange={(event) => {
                    setSocials((current) =>
                      current.map((item, rowIndex) =>
                        rowIndex === index ? { ...item, url: event.target.value } : item,
                      ),
                    )
                    touch()
                  }}
                  placeholder="https://"
                  value={row.url}
                />
                <RowActions
                  count={socials.length}
                  index={index}
                  onMove={(direction) => {
                    setSocials((current) => moveItem(current, index, direction))
                    touch()
                  }}
                  onRemove={() => {
                    setSocials((current) => current.filter((_, rowIndex) => rowIndex !== index))
                    touch()
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="sticky bottom-4 flex justify-end">
        <PrimaryButton
          className="shadow-lg"
          disabled={!dirty || saving}
          onClick={() => void save()}
        >
          {saving ? "Saving…" : saved ? "Saved" : "Save changes"}
        </PrimaryButton>
      </div>
    </div>
  )
}
