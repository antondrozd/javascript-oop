import jsdom from 'jsdom';

import Tab from './tab';
import TabBar from './tab-bar';

const dom = new jsdom.JSDOM(`
    <nav class="tab-bar">
        <a href="#panel-1" class="tab active">Panel 1</a>
        <a href="#panel-2" class="tab">Panel 2</a>
        <a href="#panel-3" class="tab">Panel 3</a>
    </nav>
`);
const document = dom.window.document;

const element = document.querySelector('.tab-bar');
const tabElements = Array.of(...element.querySelectorAll('.tab'));
const tabs = tabElements.map(element => new Tab({ element }));

describe('TabBar', () => {
    let tabBar;
    let handleChange = jest.fn();

    beforeEach(() => {
        tabBar = new TabBar({
            element,
            tabs,
            onChange: handleChange
        });
    });

    describe('TabBar.constructor()', () => {
        test('создает объект типа `TabBar`', () => {
            expect(tabBar).toBeInstanceOf(TabBar);
        });
    });

    describe('TabBar.element', () => {
        test('возвращает HTML элемент', () => {
            expect(tabBar.element).toBe(element);
        });
    });

    describe('TabBar.tabs', () => {
        test('возвращает объекты типа `Tab`', () => {
            expect(tabBar.tabs[0]).toBeInstanceOf(Tab);
        });
    });

    describe('TabBar.activeTab', () => {
        test('возвращает активную вкладку', () => {
            expect(tabBar.activeTab).toBe(tabs[0]);
        });
    });

    describe('TabBar.activeTabIndex', () => {
        test('возвращает индекс активной вкладки', () => {
            expect(tabBar.activeTabIndex).toBe(0);
        });
    });

    describe('TabBar.handleActivate()', () => {
        beforeEach(() => {
            tabs[1].element.click();
        });

        test('делает активной нажатую вкладку', () => {
            expect(tabs[0].isActive).toBe(false);
            expect(tabs[1].isActive).toBe(true);
            expect(tabs[2].isActive).toBe(false);
        });

        test('вызывает функцию обратного вызова', () => {
            expect(handleChange).toHaveBeenCalled();
        });

        test('отправляет в функцию обратного вызова передавая объект активной вкладки', () => {
            expect(handleChange).toHaveBeenCalledWith(tabs[1]);
        });
    });
});
