import { useAppSelector } from "@/hooks";
import styles from "./TagFilter.module.scss";
import Image from "next/image";
import { useFilter } from "@/hooks/useFilter";
import { getCurrentName } from "@/utils/getCurrentName";
import { Fragment, useEffect, useState } from "react";

const TAGS_EXCLUDE = [
    "afterbirth",
    "afterbirth_plus",
    "repentance",
    "rebirth",
    "super_bum",
    "quest_item",
    "no_greed",
];

export default function TagFilter() {
    const onFiltersChange = useFilter();
    const stateLang = useAppSelector((state) => state.settings.namesLanguage);

    let tags = useAppSelector((state) => state.tags.value);

    tags = tags.filter((tag) => !TAGS_EXCLUDE.includes(tag.tagId));

    [tags[2], tags[6]] = [tags[6], tags[2]];

    return (
        <div className={styles["tag-filter"]}>
            <p className={styles["tag-heading"]}>Теги</p>
            <div className={styles["tag-inputlist"]}>
                {tags.map((tag, index) => {
                    const imgWidth = index == 6 || index == 9 ? 50 : 35;

                    const name = getCurrentName(tag.name);
                    const id = tag.tagId;
                    const path = `/tagsFilter/${id}.png`;
                    return (
                        <Fragment key={tag.tagId}>
                            <input
                                className={styles["tag-input"]}
                                type="checkbox"
                                name="tag"
                                id={`tag-${id}`}
                                value={id}
                                onChange={(e) => {
                                    onFiltersChange({
                                        value: e.target.value,
                                        key: "tag",
                                        checked: e.target.checked,
                                    });
                                }}
                            />
                            <label
                                className={styles["tag-label"]}
                                htmlFor={`tag-${id}`}
                                data-tooltip-html={name}
                                data-tooltip-id="modal-tooltip"
                            >
                                <Image
                                    className={styles["tag-img"]}
                                    src={path}
                                    alt={name}
                                    width={imgWidth}
                                    height={35}
                                />
                            </label>
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
}
