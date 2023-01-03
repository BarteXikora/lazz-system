import { useEffect } from 'react'

const useCssAnimate = (wake, animations) => {
    useEffect(() => {
        animations.forEach((animationsSet) => {
            if (animationsSet.element !== null) {
                const toDo = wake ? animationsSet.onTrue : animationsSet.onFalse

                toDo.forEach((step) => {
                    setTimeout(() => {
                        if (step.addClass) step.addClass.forEach((addClass) =>
                            animationsSet.element.classList.add(addClass)
                        )

                        if (step.removeClass) step.removeClass.forEach((removeClass) =>
                            animationsSet.element.classList.remove(removeClass)
                        )

                    }, step.delay)
                })
            }
        })

    }, [wake])

    return true
}

export default useCssAnimate