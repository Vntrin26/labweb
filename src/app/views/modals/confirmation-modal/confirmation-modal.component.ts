import { Component, Output, EventEmitter } from '@angular/core';




@Component({
    selector: 'confirmation-modal',
    templateUrl: './confirmation-modal.component.html'
})

export class ConfirmationModalComponent{
    public visible = false;
    public visibleAnimate = false;

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true, 100);
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }

    public onContainerClicked(event: MouseEvent): void {
        if ((<HTMLElement>event.target).classList.contains('modal')) {
            this.hide();
        }
    }
}