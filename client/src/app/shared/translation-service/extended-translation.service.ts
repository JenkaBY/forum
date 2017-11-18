import { TranslateService } from 'ng2-translate';

export class ExtendedTranslationService extends TranslateService {

  getTranslate(translationKey: string, interpolationObj?: any): string {
    let translated: string;
    this.get(translationKey, interpolationObj)
      .subscribe(
        (translation: string) => {
          translated = translation;
        }
      );
    return translated;
  }
}