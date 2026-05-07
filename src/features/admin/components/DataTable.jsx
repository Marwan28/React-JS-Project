import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const getValue = (item, key) => item?.[key] ?? "";

const DataTable = ({
    columns,
    data,
    searchable = false,
    searchPlaceholder = "Search...",
    actions,
    rowKey = "id",
}) => {
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder((current) => (current === "asc" ? "desc" : "asc"));
            return;
        }

        setSortKey(key);
        setSortOrder("asc");
    };

    const filteredData = useMemo(() => {
        let rows = [...data];
        const normalizedSearch = searchTerm.trim().toLowerCase();

        if (searchable && normalizedSearch) {
            rows = rows.filter((item) =>
                Object.values(item).some((value) =>
                    String(value ?? "").toLowerCase().includes(normalizedSearch),
                ),
            );
        }

        if (sortKey) {
            rows.sort((a, b) => {
                const aValue = getValue(a, sortKey);
                const bValue = getValue(b, sortKey);

                if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
                if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        }

        return rows;
    }, [data, searchable, searchTerm, sortKey, sortOrder]);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
            {searchable && (
                <div className="border-b border-gray-200 p-3 dark:border-slate-800 sm:p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-slate-950 outline-none transition focus:border-[#243b53] focus:bg-white focus:ring-2 focus:ring-[#243b53]/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#344d60] dark:focus:bg-slate-900 dark:focus:ring-[#344d60]/30"
                        />
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] lg:min-w-[980px]">
                    <thead className="bg-gray-50 dark:bg-slate-950/60">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    onClick={() => column.sortable && handleSort(column.key)}
                                    className={`px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200 sm:px-6 sm:py-4 ${column.sortable ? "cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-slate-800/70" : ""}`}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.label}
                                        {column.sortable && (
                                            <span className="flex flex-col">
                                                <ChevronUp
                                                    className={`-mb-1 h-3 w-3 ${sortKey === column.key && sortOrder === "asc" ? "text-[#1A2C3C] dark:text-white" : "text-gray-300 dark:text-slate-600"}`}
                                                />
                                                <ChevronDown
                                                    className={`h-3 w-3 ${sortKey === column.key && sortOrder === "desc" ? "text-[#1A2C3C] dark:text-white" : "text-gray-300 dark:text-slate-600"}`}
                                                />
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {actions && (
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200 sm:px-6 sm:py-4">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
                        {filteredData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (actions ? 1 : 0)}
                                    className="px-4 py-10 text-center text-sm font-medium text-gray-500 dark:text-slate-400 sm:px-6 sm:py-12"
                                >
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            filteredData.map((item, index) => (
                                <tr
                                    key={item?.[rowKey] ?? index}
                                    className="transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/50"
                                >
                                    {columns.map((column) => (
                                        <td key={column.key} className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200 sm:px-6 sm:py-4">
                                            {column.render ? column.render(item) : getValue(item, column.key)}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200 sm:px-6 sm:py-4">
                                            {actions(item)}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
