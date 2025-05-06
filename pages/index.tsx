// pages/index.tsx

import { useState } from 'react'

// Item structure
type Item = { name: string; type: string }

// Page component
export default function Home({ initialItems }: { initialItems: Item[] }) {
    // State for items
    const [items, setItems] = useState<Item[]>(initialItems)

    // State for form inputs
    const [name, setName] = useState('')
    const [itemType, setItemType] = useState('')

    // State for sorting
    const [sortField, setSortField] = useState<'date' | 'name' | 'type'>('date')

    // Add item to list
    async function addItem(e: React.FormEvent) {
        e.preventDefault()

        const res = await fetch('/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, type: itemType }),
        })

        if (res.ok) {
            const newItem = await res.json() as Item
            setItems(prev => [...prev, newItem])
            setName('')
            setItemType('')
        }
    }

    // Sort items
    const sortedItems = (() => {
        const copy = [...items]
        if (sortField === 'name') {
            return copy.sort((a, b) => a.name.localeCompare(b.name))
        }
        if (sortField === 'type') {
            return copy.sort((a, b) => a.type.localeCompare(b.type))
        }
        return copy
    })()

    return (
        <div className="p-5">
            <h1 className="flex text-4xl flex-col justify-center items-center">Items</h1>

            {/* Form */}
            <form
                onSubmit={addItem}
                className="justify-center items-center mb-6 flex flex-col sm:flex-row gap-2 sm:items-center"
            >
                <input
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="px-3 py-2 border rounded-md w-full sm:w-auto"
                />
                <input
                    placeholder="Type"
                    value={itemType}
                    onChange={e => setItemType(e.target.value)}
                    required
                    className="px-3 py-2 border rounded-md w-full sm:w-auto"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    Add
                </button>
            </form>

            {/* Sort buttons */}
            <div className="justify-center items-center mb-4 flex flex-wrap gap-2">
                <button
                    onClick={() => setSortField('name')}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                    Sort by Name
                </button>
                <button
                    onClick={() => setSortField('type')}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                    Sort by Type
                </button>
                <button
                    onClick={() => setSortField('date')}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                    Sort by Date Added
                </button>
            </div>

            {/* Item list */}
            <div className="flex justify-center">
                <ul className="space-y-5 w-full max-w-xl">
                    {sortedItems.map((it, i) => (
                        <li key={i} className="flex justify-between text-xl border-b-2 pb-2">
                            <span className="text-blue-600 font-semibold">{it.name}</span>
                            <span className="text-green-600 italic">{it.type}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

// Get items on server
export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/items')
    const initialItems: Item[] = await res.json()
    return { props: { initialItems } }
}
