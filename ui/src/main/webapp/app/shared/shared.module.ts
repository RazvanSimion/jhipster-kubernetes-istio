import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UiSharedLibsModule, UiSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [UiSharedLibsModule, UiSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [UiSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UiSharedModule {
  static forRoot() {
    return {
      ngModule: UiSharedModule
    };
  }
}
