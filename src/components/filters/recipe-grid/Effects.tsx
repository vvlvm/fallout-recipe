import { EFFECT_LABELS } from "@/constants/EFFECT_LABELS"
import {
  isCarryWeightEffect,
  type Effect,
  type EffectMap,
  type EffectName,
} from "@/types/RecipieType"
import clsx from "clsx"
import { IoIosTimer } from "react-icons/io"

interface Props {
  effects: EffectMap
  selectedEffect: EffectName | ""
}

export function Effects({ effects, selectedEffect }: Props) {
  return (
    <div className="list-like-grid">
      {Object.values(effects).map((effect) => (
        <ListItem
          effect={effect}
          selectedEffect={selectedEffect}
          key={effect.effectName}
        />
      ))}
    </div>
  )
}

interface TagProps {
  effect: Effect
  selectedEffect: EffectName | ""
}

function ListItem({ effect, selectedEffect }: TagProps) {
  const { effectName } = effect
  const label = EFFECT_LABELS[effectName]
  const isHighlighted = effectName === selectedEffect
  const isSingleColumn =
    effectName === "Caffeine" || effectName === "CarryWeight"
  const hasOverTime = "isOverTime" in effect && effect.isOverTime
  const hasAmount = "amount" in effect

  return (
    <div
      className={clsx("item", isSingleColumn && "single-column")}
      key={effectName}
    >
      {isSingleColumn && (
        <span className={clsx("item-name", isHighlighted && "highlight")}>
          {isCarryWeightEffect(effect) ? `${label}+${effect.amount}` : label}
        </span>
      )}

      {!isSingleColumn && (
        <>
          <span className={clsx("item-name", isHighlighted && "highlight")}>
            {label}
          </span>
          <span className="amount">
            {hasOverTime && (
              <IoIosTimer
                className={clsx(
                  "effect-is-time-over",
                  isHighlighted && "highlight",
                )}
              />
            )}
            {hasAmount && (
              <span className={clsx(isHighlighted && "highlight")}>
                {effect.amount}
              </span>
            )}
          </span>
        </>
      )}
    </div>
  )
}
