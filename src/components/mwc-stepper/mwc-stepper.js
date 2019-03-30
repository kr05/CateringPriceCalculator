import { LitElement, html, css } from 'lit-element';

class MwcStepper extends LitElement {
    
    static get styles() {
        return [
            css`
                :host {
                    display: block;
                }
            `
        ]
    }

    render() {
        return html `
            <slot></slot>
        `;
    }

    static get properties() {
        return {
            /**
             * Boolean: If true, start with all steps closed.
             */
            closed: { type: Boolean },
            /**
             * Boolean: Used to indicate if the stepper is finished or not.
             */
            finish: { type: Boolean },
            /**
             * Boolean: Used to indicate if the stepper require users to complete one step in order to move on to the next.
             */
            nonLinear: { type: Boolean },
            //////////////// Private properties ////////////////
            /**
             * Number: Contains the index of the active step
             */
            _activeStepIndex: { type: Number },
            /**
             * Array: Contains all the steps registered.
             */
            _steps: { type: Array },
        }
    }

    constructor() {
        super()
        this._steps = []
    }

    ////////////////// Public functions //////////////////
    /**
     * Function: used to close all the steps
     */
    closeAll() {
        for (let step of this._steps)
            step.active = false;
    }
    /**
     * Return: used to inicate is current step is the final step
     */
    isFinalStep() {
        let count = 0;
        for (let step of this._steps) {
            !step.save && !step.locked && !step.active && !step.optional && count++
        }
        return !count;
    }
    /**
     * Function: used to open the next step, it will save and close the current step
     */
    nextStep() {
        let currStep = this._steps[this._activeStepIndex];
        console.log('stepper next step:', currStep.invalid)
        if (currStep.invalid) {
            currStep.fireInvalidStep();
        } else {
            currStep.save = true;
            this.skipStep();
        }
    }
    /**
     * Function: used to reset current steps
     */
    _resetStep() {
        console.log('on stepper reset step')
        let currStep = this._steps[this._activeStepIndex];
        currStep.save = false;
    }
    /**
     * Function: used to open the previous step, it will close, not save, the current step
     */
    prevStep() {
        let prevStep = this._calcPrevStep();
        prevStep === null || this._steps[prevStep]._setActive();
    }
    /**
     * Function: used to unsave all steps
     */
    reset() {
        this.finish = false;
        this._activeStepIndex = null;
        for (let step of this._steps) {
            step.active = false;
            step.save = false;
        }
        this.closed || this._steps[0]._setActive();
    }
    /**
     * Function: used to set the active step by number/index.
     */
    setActiveByIndex(i) {
        i >= this._steps.length || i < 0 || this._steps[i]._setActive();
    }
    /**
     * Function: used to open the next step, it will close, not save, the current step
     */
    skipStep() {
        let nextIndex = this._calcNextStep();
        nextIndex === null || this._steps[nextIndex]._setActive();
    }
    ///////////////// Private functions /////////////////
    /*
     * Return: provides the index closest valid step, going forwards through the array
     */
    _calcNextStep() {
        let stepIndex = (this._activeStepIndex + 1) % this._steps.length;
        let nextIndex = null;
        while (stepIndex != this._activeStepIndex) {
            let checkStep = this._steps[stepIndex];
            if (checkStep.locked || checkStep.save) {
                stepIndex = (stepIndex + 1) % this._steps.length;
            } else {
                nextIndex = stepIndex;
                stepIndex = this._activeStepIndex;
            }
        }
        return nextIndex
    }
    /*
     * Return: provides the index closest valid step, going backwards through the array
     */
    _calcPrevStep() {
        let stepIndex = this._activeStepIndex == 0 ? this._steps.length - 1 : this._activeStepIndex - 1;
        let prevIndex = null;
        while (stepIndex != this._activeStepIndex) {
            let checkStep = this._steps[stepIndex];
            if (checkStep.locked || (checkStep.save && !checkStep.editable)) {
                stepIndex = stepIndex == 0 ? this._steps.length - 1 : stepIndex - 1;
            } else {
                prevIndex = stepIndex;
                stepIndex = this._activeStepIndex;
            }
        }
        return prevIndex
    }
    /**
     * Function: used to fire stepper-finished
     **/
    _finishStep() {
        console.log('on stepper finish step')
        let currStep = this._steps[this._activeStepIndex];
        if (currStep.invalid) {
            currStep.fireInvalidStep();
        } else {
            currStep.save = true
            this.closeAll();
            this.finish = true;
            this.dispatchEvent(new CustomEvent('stepper-finished', {
                bubbles: true,
                composed: true
            }));
        }
    }

    clearSteps() {
        if (!this._steps || !this._steps.length) return

        for (let el of this._steps) {
            if (el._stepIndex > 0) {
                el.removeEventListener("continue-clicked", this.nextStep.bind(this));
                el.removeEventListener("finish-clicked", this._finishStep.bind(this));
                el.removeEventListener("reset-clicked", this._resetStep.bind(this));
                el.removeEventListener("skip-clicked", this.skipStep.bind(this));
                el.removeEventListener("back-clicked", this.prevStep.bind(this));
                el.removeEventListener("update-clicked", this.nextStep.bind(this));
            } 
        }

        this._steps = this._steps.slice(0, 1)
        console.log('clearing steps:', this._steps)
        this.requestUpdate()
    }
 
    _deregisterStep(el, idx) {
        el.removeEventListener("continue-clicked", this.nextStep.bind(this));
        el.removeEventListener("finish-clicked", this._finishStep.bind(this));
        el.removeEventListener("reset-clicked", this._resetStep.bind(this));
        el.removeEventListener("skip-clicked", this.skipStep.bind(this));
        el.removeEventListener("back-clicked", this.prevStep.bind(this));
        el.removeEventListener("update-clicked", this.nextStep.bind(this));

        this._steps.splice(idx, 1);

        this.requestUpdate()
        // this.closed || this._steps[0]._setActive();
    }
 
    _registerStep(el) {
        this._steps.push(el);
        el._stepIndex = this._steps.length - 1;
        el.addEventListener("continue-clicked", this.nextStep.bind(this));
        el.addEventListener("finish-clicked", this._finishStep.bind(this));
        el.addEventListener("reset-clicked", this._resetStep.bind(this));
        el.addEventListener("skip-clicked", this.skipStep.bind(this));
        el.addEventListener("back-clicked", this.prevStep.bind(this));
        el.addEventListener("update-clicked", this.nextStep.bind(this));
        if (!this.closed && el._stepIndex === 0) el.active = true;

        this.requestUpdate()
        // this.closed || this._steps[0]._setActive();
    }

}

customElements.define('mwc-stepper', MwcStepper);