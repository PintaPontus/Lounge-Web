import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatScrollComponent} from './chat-scroll.component';

describe('ChatScrollComponent', () => {
    let component: ChatScrollComponent;
    let fixture: ComponentFixture<ChatScrollComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChatScrollComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ChatScrollComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
