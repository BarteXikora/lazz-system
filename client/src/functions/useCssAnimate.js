import { useEffect } from 'react'

const useCssAnimate = (wake, data) => {
    useEffect(() => {
        data.forEach(animation => {
            const element = animation.element

            if (element === null) return

            animation.animations.forEach(trigger => {
                let condition = false

                if (trigger.on !== undefined) { if (wake === trigger.on) condition = true }
                else if (trigger.onNot !== undefined) { if (wake !== trigger.on) condition = true }

                if (condition) {
                    trigger.steps.forEach(step => {
                        const delay = step.delay || 0

                        setTimeout(() => {
                            if (step.addClass) step.addClass.forEach(ac => element.classList.add(ac))
                            if (step.remClass) step.remClass.forEach(rc => element.classList.remove(rc))

                            if (step.addCss) for (const [key, value] of Object.entries(step.addCss)) {
                                element.style[key] = value
                            }
                        }, delay)
                    })
                }
            })

        })

    }, [wake])

    return true
}

export default useCssAnimate




/*



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



*/