import { type ReactNode, useEffect, useState, useCallback } from "react";
import {
    ChevronDown,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface TabItem {
    id: number;
    title: string;
    Component?: React.FC<any>;
    url?: string;
}

export function ShiftingDropDown({ tabs, onLinkClick }: { tabs: TabItem[], onLinkClick?: (url: string) => void }) {
    return (
        <div className="flex justify-start bg-transparent text-white md:justify-center">
            <Tabs tabs={tabs} onLinkClick={onLinkClick} />
        </div>
    );
};

const Tabs = ({ tabs, onLinkClick }: { tabs: TabItem[], onLinkClick?: (url: string) => void }) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [dir, setDir] = useState<null | "l" | "r">(null);

    const handleSetSelected = (val: number | null) => {
        const tab = tabs.find(t => t.id === val);
        if (val && !tab?.Component) {
            setSelected(null);
            return;
        }

        if (typeof selected === "number" && typeof val === "number") {
            setDir(selected > val ? "r" : "l");
        } else if (val === null) {
            setDir(null);
        }

        setSelected(val);
    };

    return (
        <div
            onMouseLeave={() => handleSetSelected(null)}
            className="relative flex h-fit gap-2"
        >
            {tabs.map((t) => {
                return (
                    <Tab
                        key={t.id}
                        selected={selected}
                        handleSetSelected={handleSetSelected}
                        tab={t.id}
                        url={t.url}
                        onLinkClick={onLinkClick}
                        hasContent={!!t.Component}
                    >
                        {t.title}
                    </Tab>
                );
            })}

            <AnimatePresence>
                {selected && <Content dir={dir} selected={selected} tabs={tabs} />}
            </AnimatePresence>
        </div>
    );
};

const Tab = ({
    children,
    tab,
    handleSetSelected,
    selected,
    url,
    onLinkClick,
    hasContent,
}: {
    children: ReactNode;
    tab: number;
    handleSetSelected: (val: number | null) => void;
    selected: number | null;
    url?: string;
    onLinkClick?: (url: string) => void;
    hasContent: boolean;
}) => {
    return (
        <button
            id={`shift-tab-${tab}`}
            onMouseEnter={() => hasContent ? handleSetSelected(tab) : handleSetSelected(null)}
            onClick={() => {
                if (hasContent) {
                    handleSetSelected(tab);
                } else if (url && onLinkClick) {
                    onLinkClick(url);
                }
            }}
            className={`
    flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold
    transition-all duration-300
    focus-visible:outline-none 
    ${selected === tab
                    ? "bg-slate-800 text-[#ffae1f] shadow-lg shadow-black/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }
  `}
        >
            <span>{children}</span>
            {hasContent && (
                <ChevronDown
                    size={16}
                    className={`text-slate-500 transition-transform duration-300 ${selected === tab ? "rotate-180 text-[#ffae1f]" : ""
                        }`}
                />
            )}
        </button>
    );
};

const Content = ({
    selected,
    dir,
    tabs
}: {
    selected: number | null;
    dir: null | "l" | "r";
    tabs: TabItem[];
}) => {
    const selectedTab = tabs.find(t => t.id === selected);
    if (!selectedTab?.Component) return null;

    return (
        <motion.div
            id="overlay-content"
            initial={{
                opacity: 0,
                y: 8,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: 8,
            }}
            className="absolute left-0 top-[calc(100%_+_24px)] w-auto min-w-[320px] rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl text-slate-200 shadow-2xl p-6"
        >
            <Bridge />
            <Nub selected={selected} />

            {tabs.map((t) => {
                return (
                    <div className="overflow-hidden" key={t.id}>
                        {selected === t.id && t.Component && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                                }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                                <t.Component />
                            </motion.div>
                        )}
                    </div>
                );
            })}
        </motion.div>
    );
};

const Bridge = () => (
    <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }: { selected: number | null }) => {
    const [left, setLeft] = useState(0);

    const moveNub = useCallback(() => {
        if (selected) {
            const hoveredTab = document.getElementById(`shift-tab-${selected}`);
            const overlayContent = document.getElementById("overlay-content");

            if (!hoveredTab || !overlayContent) return;

            const tabRect = hoveredTab.getBoundingClientRect();
            const { left: contentLeft } = overlayContent.getBoundingClientRect();

            const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

            setLeft(tabCenter);
        }
    }, [selected]);

    useEffect(() => {
        moveNub();
    }, [selected, moveNub]);

    return (
        <motion.span
            style={{
                clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
            }}
            animate={{ left }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-slate-900 border-l border-t border-slate-800"
        />
    );
};
