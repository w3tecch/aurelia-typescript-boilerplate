import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { BindingSignaler } from 'aurelia-templating-resources';
import moment from 'moment';

import { Logger, LogManager} from './logger.service';

export const LocaleChangedSignal: string = 'locale:changed';

@autoinject
export class LanguageService {

    private logger: Logger;

    constructor(
        private i18n: I18N,
        private bindingSignaler: BindingSignaler
    ) {
        this.logger = LogManager.getLogger('LanguageService');
        this.logger.debug('initialized');
        this.logger.debug(`current locale: ${this.getCurrentLocale()}`);
    }

    /**
     * Return the language: en, de, fr, it
     */
    public getCurrentLang(): string {
        return this.getCurrentLocale().split('-')[0];
    }

    /**
     * Get the list of all supported locales from our translations,
     * then get the current browser locale, if we have a translation
     * returns the language or fallback to default -> en
     */
    public getCurrentUILanguage(): string {
        const supported = this.getSupportedLanguages();
        const currentLanguage = this.getCurrentLang();
        return supported.indexOf(currentLanguage) > -1 ? currentLanguage : 'en';
    }

    /**
     * Get a list of current configured languages which has a translation.
     */
    public getSupportedLanguages(): string[] {
        const languages = Object.keys(this.i18n.i18next.options.fallbackLng)
            .map(key => this.i18n.i18next.options.fallbackLng[key][0].split('-')[0])
            .filter((value, index, array) => {
                return array.indexOf (value) === index;
            });
        return languages;
    }

    public getCurrentLocale(): string {
        return this.i18n.getLocale();
    }

    public setLocale(locale: string): void {
        moment.locale(locale);
        this.i18n.setLocale(locale);
        this.bindingSignaler.signal(LocaleChangedSignal);
        this.logger.debug(`changed locale to: ${locale}`);
    }
}
