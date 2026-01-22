/*
 * This file is part of Overview Tweaks (gnome-overview-tweaks).
 * 
 *  This program is free software: you can redistribute it and/or modify
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

import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as WindowPreview from 'resource:///org/gnome/shell/ui/windowPreview.js';

export default class AppIconSizeControlExtension extends Extension {
    enable() {
        // Use instance properties instead of globals
        this._settings = this.getSettings('org.gnome.shell.extensions.overview-tweaks');

        // Avoid double-wrapping if enable() somehow runs twice
        if (!this._originalInit) {
            this._originalInit = WindowPreview.WindowPreview.prototype._init;
        }

        const extension = this;

        WindowPreview.WindowPreview.prototype._init = function (...args) {
            // Call original _init
            extension._originalInit.apply(this, args);

            const iconSize = extension._settings.get_int('app-icon-size');

            if (iconSize > 0 && this._icon) {
                this._icon.set_style(`width: ${iconSize}px; height: ${iconSize}px;`);
            }
        };
    }

    disable() {
        if (this._originalInit) {
            WindowPreview.WindowPreview.prototype._init = this._originalInit;
            this._originalInit = null;
        }

        this._settings = null;
    }
}

