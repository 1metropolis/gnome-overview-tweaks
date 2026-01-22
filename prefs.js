/*
 * This file is part of Overview Tweaks (gnome-overview-tweaks).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';

import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

const ICON_SIZE_RANGE = [16, 24, 32, 40, 48, 64];

export default class AppIconSizeControlPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings('org.gnome.shell.extensions.overview-tweaks');

        const page = new Adw.PreferencesPage();

        const group = new Adw.PreferencesGroup({
            title: 'Overview Window Selector Icon Size',
            description: 'Adjust the size of app icons in the GNOME overview window selector',
        });

        const sizeBox = new Gtk.Box({
            orientation: Gtk.Orientation.HORIZONTAL,
            spacing: 12,
            margin_top: 12,
            margin_bottom: 12,
            margin_start: 12,
            margin_end: 12,
        });

        const label = new Gtk.Label({
            label: 'Window Picker Icon Size (px):',
            halign: Gtk.Align.START,
            hexpand: true,
        });

        const scale = new Gtk.Scale({
            orientation: Gtk.Orientation.HORIZONTAL,
            adjustment: new Gtk.Adjustment({
                lower: ICON_SIZE_RANGE[0],
                upper: ICON_SIZE_RANGE[ICON_SIZE_RANGE.length - 1],
                step_increment: 1,
                value: settings.get_int('app-icon-size'),
            }),
            draw_value: true,
            value_pos: Gtk.PositionType.RIGHT,
            hexpand: true,
        });

        ICON_SIZE_RANGE.forEach(size => {
            scale.add_mark(size, Gtk.PositionType.BOTTOM, null);
        });

        settings.bind(
            'app-icon-size',
            scale.adjustment,
            'value',
            Gio.SettingsBindFlags.DEFAULT,
        );

        sizeBox.append(label);
        sizeBox.append(scale);

        const row = new Adw.ActionRow();
        row.set_child(sizeBox);

        group.add(row);
        page.add(group);
        window.add(page);
    }
}
