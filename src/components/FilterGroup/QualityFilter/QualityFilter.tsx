import { useFilter } from "@/hooks/useFilter"
import styles from "./QualityFilter.module.scss"

export default function QualityFilter(){
    const onFiltersChange = useFilter()

    const qualityValues = [0, 1, 2, 3, 4]

    return(
    <div className={styles['quality-filter']}>
        Качество
        <div className={styles['quality-inputlist']}>
            {qualityValues.map((qualityValue)=>{
                return (
                    <>  
                        <input className={styles['quality-input']} type="checkbox" name="quality" key={`quality-input-${qualityValue}`} id={`quality-${qualityValue}`} value={qualityValue} onChange={(e)=>{
                            onFiltersChange(
                                {
                                    value: parseInt(e.target.value),
                                    key: "quality",
                                    checked: e.target.checked
                                })
                        }} />
                        <label className={styles['quality-label']} htmlFor={`quality-${qualityValue}`} key={`quality-label-${qualityValue}`}>{qualityValue}</label>
                    </>
                )
            })}
        </div>
    </div>
    )
}