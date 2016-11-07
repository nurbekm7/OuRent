/**
* @version: 2.1.24
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2016 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: https://www.improvely.com/
*/
// Follow the UMD template https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Make globaly available as well
        define(['moment', 'jquery'], function (moment, jquery) {
            return (root.daterangepicker = factory(moment, jquery));
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node / Browserify
        //isomorphic issue
        var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;
        if (!jQuery) {
            jQuery = require('jquery');
            if (!jQuery.fn) jQuery.fn = {};
        }
        module.exports = factory(require('moment'), jQuery);
    } else {
        // Browser globals
        root.daterangepicker = factory(root.moment, root.jQuery);
    }
}(this, function(moment, $) {
    var DateRangePicker = function(element, options, cb) {

        this.parentEl = 'body';
        this.element = $(element);
        this.startDate = null;
        this.endDate = null;
        this.startTime = null,
        this.endTime = null,
        this.timeList = {
            '00:00:00' : '00:00',
            '01:00:00' : '01:00',
            '02:00:00' : '02:00',
            '03:00:00' : '03:00',
            '04:00:00' : '04:00',
            '05:00:00' : '05:00',
            '06:00:00' : '06:00',
            '07:00:00' : '07:00',
            '08:00:00' : '08:00',
            '09:00:00' : '09:00',
            '10:00:00' : '10:00',
            '11:00:00' : '11:00',
            '12:00:00' : '12:00',
            '13:00:00' : '13:00',
            '14:00:00' : '14:00',
            '15:00:00' : '15:00',
            '16:00:00' : '16:00',
            '17:00:00' : '17:00',
            '18:00:00' : '18:00',
            '19:00:00' : '19:00',
            '20:00:00' : '20:00',
            '21:00:00' : '21:00',
            '22:00:00' : '22:00',
            '23:00:00' : '23:00',
        },
        this.minDate = moment();
        this.maxDate = false;
        this.singleDatePicker = true;
        this.showDropdowns = false;
        this.showWeekNumbers = false;
        this.showISOWeekNumbers = false;
        this.linkedCalendars = true;
        this.opens = 'right';
        this.drops = 'down';
        this.buttonClasses = 'app-btn-default min width-100';
        this.applyClass = 'darkblue';
        this.clearClass = 'gray';
        this.cancelClass = 'gray';
        this.disabledSourceUrl = false;
        this.locale = {
            direction: 'ltr',
            format: 'YYYY-MM-DD',
            applyLabel: 'Готово',
            cancelLabel: 'Отменить',
            clearLabel: 'Сбросить',
            weekLabel: 'W',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.months(),
            firstDay: moment.localeData().firstDayOfWeek(),
            previewFormat: 'DD MMM YYYY',
            defaultTime: '10:00:00'
        };

        this.callback = function() { };

        //some state information
        this.isShowing = false;
        this.leftCalendar = {};
        this.rightCalendar = {};

        //custom options from user
        if (typeof options !== 'object' || options === null)
            options = {};

        //allow setting options with data attributes
        //data-api options will be overwritten with custom javascript options
        options = $.extend(this.element.data(), options);

        //html template for the picker UI
        if (typeof options.template !== 'string' && !(options.template instanceof $)) {
            options.template = '<div class="daterangepicker dropdown-menu">' +
                '<div class="calendar left">' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="calendar right">' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="timepicker">' +
                '</div>'+
                '<div class="controls row">' +
                    '<div class="col-xs-6"><button class="applyBtn" type="button"></button></div>' +
                    '<div class="col-xs-6"><button class="clearBtn" type="button"></button></div>' +
                '</div>' +
            '</div>';
        }
        
        this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
        this.container = $(options.template).appendTo(this.parentEl);

        //
        // handle all the possible options overriding defaults
        //

        if (typeof options.locale === 'object') {
            if (typeof options.locale.direction === 'string')
                this.locale.direction = options.locale.direction;

            if (typeof options.locale.format === 'string')
                this.locale.format = options.locale.format;

            if (typeof options.locale.daysOfWeek === 'object')
                this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

            if (typeof options.locale.monthNames === 'object')
              this.locale.monthNames = options.locale.monthNames.slice();

            if (typeof options.locale.firstDay === 'number')
              this.locale.firstDay = options.locale.firstDay;

            if (typeof options.locale.applyLabel === 'string')
              this.locale.applyLabel = options.locale.applyLabel;

            if (typeof options.locale.cancelLabel === 'string')
              this.locale.cancelLabel = options.locale.cancelLabel;
          
            if (typeof options.locale.clearLabel === 'string')
              this.locale.clearLabel = options.locale.clearLabel;

            if (typeof options.locale.weekLabel === 'string')
              this.locale.weekLabel = options.locale.weekLabel;

        }
        
        this.container.addClass(this.locale.direction);

        if (typeof options.startDate === 'string')
            this.startDate = moment(options.startDate, this.locale.format);

        if (typeof options.endDate === 'string')
            this.endDate = moment(options.endDate, this.locale.format);

        if (typeof options.startDate === 'object')
            this.startDate = moment(options.startDate);

        if (typeof options.endDate === 'object')
            this.endDate = moment(options.endDate);

        // sanity check for bad options
        if (this.minDate && this.startDate && this.startDate.isBefore(this.minDate))
            this.startDate = this.minDate.clone();

        if (typeof options.applyClass === 'string')
            this.applyClass = options.applyClass;

        if (typeof options.cancelClass === 'string')
            this.cancelClass = options.cancelClass;

        if (typeof options.clearClass === 'string')
            this.cancelClass = options.clearClass;

        if (typeof options.opens === 'string')
            this.opens = options.opens;

        if (typeof options.drops === 'string')
            this.drops = options.drops;

        if (typeof options.showWeekNumbers === 'boolean')
            this.showWeekNumbers = options.showWeekNumbers;

        if (typeof options.showISOWeekNumbers === 'boolean')
            this.showISOWeekNumbers = options.showISOWeekNumbers;

        if (typeof options.buttonClasses === 'string')
            this.buttonClasses = options.buttonClasses;

        if (typeof options.buttonClasses === 'object')
            this.buttonClasses = options.buttonClasses.join(' ');

        if (typeof options.showDropdowns === 'boolean')
            this.showDropdowns = options.showDropdowns;

        if (typeof options.singleDatePicker === 'boolean') {
            this.singleDatePicker = options.singleDatePicker;
        }

        if (typeof options.linkedCalendars === 'boolean')
            this.linkedCalendars = options.linkedCalendars;
        
        if (typeof options.disabledSourceUrl === 'string')
            this.disabledSourceUrl = options.disabledSourceUrl;

        // update day names order to firstDay
        if (this.locale.firstDay != 0) {
            var iterator = this.locale.firstDay;
            while (iterator > 0) {
                this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                iterator--;
            }
        }

        var start, end, range;

        if (typeof cb === 'function') {
            this.callback = cb;
        }
        
        if (this.locale.lang) {
            moment.locale(this.locale.lang);
        }

        if (this.singleDatePicker) {
            this.container.addClass('single');
            this.container.find('.calendar.left').addClass('single');
            this.container.find('.calendar.left').show();
            this.container.find('.calendar.right').hide();
        }

        this.container.addClass('opens' + this.opens);

        //apply CSS classes and labels to buttons
        this.container.find('.applyBtn, .cancelBtn, .clearBtn').addClass(this.buttonClasses);
        if (this.applyClass.length)
            this.container.find('.applyBtn').addClass(this.applyClass);
        if (this.cancelClass.length)
            this.container.find('.cancelBtn').addClass(this.cancelClass);
        if (this.clearClass.length)
            this.container.find('.clearBtn').addClass(this.clearClass);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);
        this.container.find('.clearBtn').html(this.locale.clearLabel);

        this.container.find('.calendar')
            .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
            .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
            .on('click.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
            .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
            .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))

        this.container.find('.timepicker')
            .on('change.daterangepicker', '.start-time > select', $.proxy(this.changeStartTime, this))
            .on('change.daterangepicker', '.end-time > select', $.proxy(this.changeEndTime, this));

        this.container.find('.controls')
            .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
            .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))
            .on('click.daterangepicker', 'button.clearBtn', $.proxy(this.clickClear, this));


        if (this.element.is('input')) {
            this.wrapper = $('<div class="daterangepicker-wrapper"></div>');
            this.wrapper.css({width: this.element.outerWidth(), height: this.element.outerHeight()});
            this.element.wrap(this.wrapper);
            this.element.attr('type', 'hidden');
            
            this.wrapper = this.element.parent();
            this.wrapper.append(
                '<span class="placeholder"></span>\
                <span class="preview">\
                    <span class="start">\
                        <span class="date"/><span class="time"/>\
                    </span>\
                    <span class="end">\
                        <span class="date"/><span class="time"/>\
                    </span>\
                </span>'
            );
            this.wrapper.find('.placeholder').text(this.element.attr('placeholder'));
            
            var value = $(this.element).val();
            try {
                var data = JSON.parse(value);
                if (data.start && data.end && data.start.date && data.start.time && data.end.date && data.end.time) {
                    this.setStartDate(data.start.date);
                    this.setEndDate(data.end.date);
                    this.setStartTime(data.start.time);
                    this.setEndTime(data.end.time);
                    this.updateWrapper();
                }
            } catch (e) {
                console.log(e);
            }
            
            this.wrapper.on('click.daterangepicker', $.proxy(this.toggle, this));
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
        }
    };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setStartDate: function(startDate) {
            if (typeof startDate === 'string')
                this.startDate = moment(startDate, this.locale.format);

            if (typeof startDate === 'object')
                this.startDate = moment(startDate);
            
            this.maxDate = false;
            
            for (i in this.disabledDates) {
                var disabled = this.disabledDates[i];
                
                if (disabled.date.isAfter(this.startDate, 'day')) {
                    this.maxDate = disabled.date.clone().endOf('day');
                    return this.updateCalendars();
                }
            }

            if (this.minDate && this.startDate.isBefore(this.minDate)) {
                this.startDate = this.minDate;
            }

            this.startTime = null;
            this.setStartTime(this.locale.defaultTime);

            if (!this.isShowing)
                this.updateElement();
            
            this.updateMonthsInView();
        },
        
        setStartTime: function(time) {
            if (this.checkAvailableTime(this.startDate, time) === false) {
                return false;
            }
            
            this.startTime = time;
        },

        setEndDate: function(endDate) {
            if (typeof endDate === 'string')
                this.endDate = moment(endDate, this.locale.format);

            if (typeof endDate === 'object')
                this.endDate = moment(endDate);

            if (this.endDate.isBefore(this.startDate))
                this.endDate = this.startDate.clone();

            this.endTime = null;
            this.setEndTime(this.locale.defaultTime);

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },
        
        setEndTime: function(time) {            
            if (this.checkAvailableTime(this.endDate, time) === false) {
                return false;
            }
            
            this.endTime = time;
        },

        updateView: function() {
            this.updateMonthsInView();
            this.updateCalendars();
            this.updateFormInputs();
        },

        updateMonthsInView: function() {
            var startDate = (this.startDate) ? this.startDate.clone() : moment().startOf('day');
            var endDate   = (this.endDate)   ? this.endDate.clone()   : moment().endOf('day');
            
            if (endDate) {

                //if both dates are visible already, do nothing
                if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                    (startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    &&
                    (endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    ) {
                    return;
                }

                this.leftCalendar.month = startDate.clone().date(2);
                if (!this.linkedCalendars && (endDate.month() != startDate.month() || endDate.year() != startDate.year())) {
                    this.rightCalendar.month = endDate.clone().date(2);
                } else {
                    this.rightCalendar.month = startDate.clone().date(2).add(1, 'month');
                }

            } else {
                if (this.leftCalendar.month.format('YYYY-MM') != startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != startDate.format('YYYY-MM')) {
                    this.leftCalendar.month = startDate.clone().date(2);
                    this.rightCalendar.month = startDate.clone().date(2).add(1, 'month');
                }
            }
            if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
              this.rightCalendar.month = this.maxDate.clone().date(2);
              this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
            }
        },

        updateCalendars: function() {

            if (this.singleDatePicker === true) {
                this.renderCalendar('left');
            } else {
                this.renderCalendar('left');
                this.renderCalendar('right');
            }
            this.loadDisabledDates();
            this.renderTimepicker();
            this.showCalendars();
            
        },

        renderCalendar: function(side) {
            //
            // Build the matrix of dates that will populate the calendar
            //

            var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
            var month = calendar.month.month();
            var year = calendar.month.year();
            var hour = calendar.month.hour();
            var minute = calendar.month.minute();
            var second = calendar.month.second();
            var daysInMonth = moment([year, month]).daysInMonth();
            var firstDay = moment([year, month, 1]);
            var lastDay = moment([year, month, daysInMonth]);
            var lastMonth = moment(firstDay).subtract(1, 'month').month();
            var lastYear = moment(firstDay).subtract(1, 'month').year();
            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
            var dayOfWeek = firstDay.day();

            //initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            calendar.firstDay = firstDay;
            calendar.lastDay = lastDay;

            for (var i = 0; i < 6; i++) {
                calendar[i] = [];
            }

            //populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth)
                startDay -= 7;

            if (dayOfWeek == this.locale.firstDay)
                startDay = daysInLastMonth - 6;

            var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

            var col, row;
            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                curDate.hour(12);

                if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                    calendar[row][col] = this.minDate.clone();
                }

                if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                    calendar[row][col] = this.maxDate.clone();
                }

            }
            
            calendar.startDay = calendar[0][0].clone();
            calendar.endDay   = calendar[row][col - 1].clone();

            //make the calendar object available to hoverDate/clickDate
            if (side == 'left') {
                this.leftCalendar.calendar = calendar;
            } else {
                this.rightCalendar.calendar = calendar;
            }

            //
            // Display the calendar
            //

            var minDate = side == 'left' ? this.minDate : this.startDate;
            var maxDate = this.maxDate;
            var selected = side == 'left' ? this.startDate : this.endDate;
            var arrow = this.locale.direction == 'ltr' ? {left: 'chevron-left', right: 'chevron-right'} : {left: 'chevron-right', right: 'chevron-left'};

            var html = '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';

            // add empty cell for week number
            if (this.showWeekNumbers || this.showISOWeekNumbers)
                html += '<th></th>';

            if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
                html += '<th class="prev available"><i class="fa fa-' + arrow.left + ' glyphicon glyphicon-' + arrow.left + '"></i></th>';
            } else {
                html += '<th></th>';
            }

            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

            if (this.showDropdowns) {
                var currentMonth = calendar[1][1].month();
                var currentYear = calendar[1][1].year();
                var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
                var minYear = (minDate && minDate.year()) || (currentYear - 50);
                var inMinYear = currentYear == minYear;
                var inMaxYear = currentYear == maxYear;

                var monthHtml = '<select class="monthselect select2-desktop-only">';
                for (var m = 0; m < 12; m++) {
                    if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            ">" + this.locale.monthNames[m] + "</option>";
                    } else {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                    }
                }
                monthHtml += "</select>";

                var yearHtml = '<select class="yearselect select2-desktop-only">';
                for (var y = minYear; y <= maxYear; y++) {
                    yearHtml += '<option value="' + y + '"' +
                        (y === currentYear ? ' selected="selected"' : '') +
                        '>' + y + '</option>';
                }
                yearHtml += '</select>';

                dateHtml = monthHtml + yearHtml;
            }

            html += '<th colspan="5" class="month"><span>' + dateHtml + '</span></th>';
            if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
                html += '<th class="next available"><i class="fa fa-' + arrow.right + ' glyphicon glyphicon-' + arrow.right + '"></i></th>';
            } else {
                html += '<th></th>';
            }

            html += '</tr>';
            html += '<tr>';

            // add week number label
            if (this.showWeekNumbers || this.showISOWeekNumbers)
                html += '<th class="week"><span>' + this.locale.weekLabel + '</span></th>';

            $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
                html += '<th><span>' + dayOfWeek + '</span></th>';
            });

            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            for (var row = 0; row < 6; row++) {
                html += '<tr>';

                // add week number
                if (this.showWeekNumbers)
                    html += '<td class="week"><span>' + calendar[row][0].week() + '</span></td>';
                else if (this.showISOWeekNumbers)
                    html += '<td class="week"><span>' + calendar[row][0].isoWeek() + '</span></td>';

                for (var col = 0; col < 7; col++) {

                    var classes = [];

                    //highlight today's date
                    if (calendar[row][col].isSame(new Date(), "day"))
                        classes.push('today');

                    //highlight weekends
                    if (calendar[row][col].isoWeekday() > 5)
                        classes.push('weekend');

                    //grey out the dates in other months displayed at beginning and end of this calendar
                    if (calendar[row][col].month() != calendar[1][1].month())
                        classes.push('out');

                    //don't allow selection of dates before the minimum date
                    if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of dates after the maximum date
                    if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                        classes.push('off', 'disabled');

                    //highlight the currently selected start date
                    if (this.startDate != null && calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                        classes.push('active', 'start-date');

                    //highlight the currently selected end date
                    if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                        classes.push('active', 'end-date');

                    //highlight dates in-between the selected dates
                    if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                        classes.push('in-range');
                    
                    var available = this.checkAvailableDate(calendar[row][col]);
                    
                    if (available.available === false && available.fullDay === true) {
                        classes.push('off', 'disabled');
                    }

                    if (available.available === false && available.fullDay === false) {
                        classes.push('half');
                    }

                    var cname = '', disabled = false;
                    for (var i = 0; i < classes.length; i++) {
                        cname += classes[i] + ' ';
                        if (classes[i] == 'disabled')
                            disabled = true;
                    }
                    if (!disabled)
                        cname += 'available';

                    html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '"><span>' + calendar[row][col].date() + '</span></td>';

                }
                html += '</tr>';
            }

            html += '</tbody>';
            html += '</table>';

            this.container.find('.calendar.' + side + ' .calendar-table').html(html);
            
            if (typeof window.select != 'undefined') {
                window.select.init(this.container.find('select'));
            }

        },

        renderTimepicker: function () {
            this.container.find('.timepicker').children().remove();
            
            if (this.timeList == null) {
                return;
            }
            
            if (this.startDate instanceof moment) {
                var select = $('<div><span class="start-time"><select class="select2-desktop-only"/></span><span class="start-date"></div>');
                
                for (i in this.timeList) {
                    var time   = this.timeList[i];
                    var option = $('<option value="' + i + '">' + time + '</option>');
                    
                    if (this.checkAvailableTime(this.startDate, i) === false) {
                        option.attr('disabled', true);
                    } else if (typeof this.startTime !== 'string') {
                        this.startTime = i;
                    }

                    if (this.startTime == i) {
                        option.attr('selected', true);
                    }
                    
                    select.val(this.startTime);
                    
                    if (option.is(':disabled') === false) {
                        select.find('select').append(option);
                    }
                }
                select.find('.start-date').text(this.startDate.format(this.locale.previewFormat));
                this.container.find('.timepicker').append(select);
            }

            if (this.endDate instanceof moment) {
                var select = $('<div><span class="end-time"><select class="select2-desktop-only"/></span><span class="end-date"></div>');
                
                for (i in this.timeList) {
                    var time   = this.timeList[i];
                    var option = $('<option value="' + i + '">' + time + '</option>');
                    
                    if (this.checkAvailableTime(this.endDate, i) === false) {
                        option.attr('disabled', true);
                    } else if (typeof this.endTime !== 'string') {
                        this.endTime = i;
                    }
                    
                    if (this.endTime == i) {
                        option.attr('selected', true);
                    }
                    
                    select.val(this.endTime);
                    
                    if (option.is(':disabled') === false) {
                        select.find('select').append(option);
                    }
                }
                select.find('.end-date').text(this.endDate.format(this.locale.previewFormat));
                this.container.find('.timepicker').append(select);
            }
            
            if (typeof window.select != 'undefined') {
                window.select.init(this.container.find('.timepicker select'));
            }
        },

        updateFormInputs: function() {

            if (this.startDate == null && this.endDate == null) {
                this.container.find('button.clearBtn').hide();
            } else {
                this.container.find('button.clearBtn').show();
            }
            
            if (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate))) {
                this.container.find('button.applyBtn').show();
            } else {
                this.container.find('button.applyBtn').hide();
            }
        },

        move: function() {
            var element = (this.wrapper instanceof $) ? this.wrapper : this.element;
            var parentOffset = { top: 0, left: 0 },
                containerTop;
            var parentRightEdge = $(window).width();
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
                parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
            }

            if (this.drops == 'up')
                containerTop = element.offset().top - this.container.outerHeight() - parentOffset.top;
            else
                containerTop = element.offset().top + element.outerHeight() - parentOffset.top;
            this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('dropup');

            if (this.opens == 'left') {
                this.container.css({
                    top: containerTop,
                    right: parentRightEdge - element.offset().left - element.outerWidth(),
                    left: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else if (this.opens == 'center') {
                this.container.css({
                    top: containerTop,
                    left: element.offset().left - parentOffset.left + element.outerWidth() / 2
                            - this.container.outerWidth() / 2,
                    right: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else {
                this.container.css({
                    top: containerTop,
                    left: element.offset().left - parentOffset.left,
                    right: 'auto'
                });
                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                    this.container.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }
        },

        show: function(e) {
            if (this.isShowing) return;

            // Create a click proxy that is private to this instance of datepicker, for unbinding
            this._outsideClickProxy = $.proxy(function(e) { this.outsideClick(e); }, this);

            // Bind global datepicker mousedown for hiding and
            $(document)
              .on('mousedown.daterangepicker', this._outsideClickProxy)
              // also support mobile devices
              .on('touchend.daterangepicker', this._outsideClickProxy)
              // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
              .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
              // and also close when focus changes to outside the picker (eg. tabbing between controls)
              .on('focusin.daterangepicker', this._outsideClickProxy);

            // Reposition the picker if the window is resized while it's open
            $(window).on('resize.daterangepicker', $.proxy(function(e) { this.move(e); }, this));

            if (this.startDate && this.endDate && this.startTime && this.endTime) {
                this.oldStartDate = this.startDate.clone();
                this.oldEndDate = this.endDate.clone();
                this.oldStartTime = this.startTime;
                this.oldEndTime = this.endTime;
            } else {
                this.oldStartDate = null;
                this.oldEndDate = null;
                this.oldStartTime = null;
                this.oldEndTime = null;
            }


            this.updateView();
            this.container.show();
            this.move();
            this.element.trigger('show.daterangepicker', this);
            this.isShowing = true;
        },

        hide: function(e) {
            if (!this.isShowing) return;

            if (this.startDate && this.endDate) {
                //if a new date range was selected, invoke the user callback function
                if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                    this.callback(this.startDate, this.endDate, this.chosenLabel);   
            } 

            $(document).off('.daterangepicker');
            $(window).off('.daterangepicker');
            this.container.hide();
            this.element.trigger('hide.daterangepicker', this);
            this.isShowing = false;
        },

        toggle: function(e) {
            if (this.isShowing) {
                this.startDate = this.oldStartDate;
                this.endDate = this.oldEndDate;
                this.startTime = this.oldStartTime;
                this.endTime = this.oldEndTime;
                this.maxDate = false;
                this.updateElement();
                this.hide();
            } else {
                this.show();
            }
        },

        outsideClick: function(e) {
            var target = $(e.target);
            // if the page is clicked anywhere except within the daterangerpicker/button
            // itself then call this.hide()
            if (
                // ie modal dialog fix
                e.type == "focusin" ||
                target.closest(this.element).length ||
                target.closest(this.container).length ||
                target.closest('.calendar-table').length
                ) return;
        
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.startTime = this.oldStartTime;
            this.endTime = this.oldEndTime;
            this.maxDate = false;
            this.updateElement();
            this.hide();
            this.element.trigger('outsideClick.daterangepicker', this);
        },

        showCalendars: function() {
            this.container.addClass('show-calendar');
            this.move();
            this.element.trigger('showCalendar.daterangepicker', this);
        },

        hideCalendars: function() {
            this.container.removeClass('show-calendar');
            this.element.trigger('hideCalendar.daterangepicker', this);
        },

        clickPrev: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.subtract(1, 'month');
                if (this.linkedCalendars)
                    this.rightCalendar.month.subtract(1, 'month');
            } else {
                this.rightCalendar.month.subtract(1, 'month');
            }
            this.updateCalendars();
        },

        clickNext: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.add(1, 'month');
            } else {
                this.rightCalendar.month.add(1, 'month');
                if (this.linkedCalendars)
                    this.leftCalendar.month.add(1, 'month');
            }
            this.updateCalendars();
        },

        hoverDate: function(e) {
            //ignore mouse movements while an above-calendar text input has focus
            //if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
            //    return;

            //ignore dates that can't be selected
            if (!$(e.target).hasClass('available')) {
                e.target = $(e.target).parent();
                if (!$(e.target).hasClass('available')) {
                    return;
                }
            }

            //have the text inputs above calendars reflect the date being hovered over
            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            if (this.endDate && !this.container.find('input[name=daterangepicker_start]').is(":focus")) {
                this.container.find('input[name=daterangepicker_start]').val(date.format(this.locale.format));
            } else if (!this.endDate && !this.container.find('input[name=daterangepicker_end]').is(":focus")) {
                this.container.find('input[name=daterangepicker_end]').val(date.format(this.locale.format));
            }

            //highlight the dates between the start date and the date being hovered as a potential end date
            var leftCalendar = this.leftCalendar;
            var rightCalendar = this.rightCalendar;
            var startDate = this.startDate;
            if (!this.endDate) {
                this.container.find('.calendar td').each(function(index, el) {

                    //skip week numbers, only look at dates
                    if ($(el).hasClass('week')) return;

                    var title = $(el).attr('data-title');
                    var row = title.substr(1, 1);
                    var col = title.substr(3, 1);
                    var cal = $(el).parents('.calendar');
                    var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

                    if ((dt.isAfter(startDate) && dt.isBefore(date)) || dt.isSame(date, 'day')) {
                        $(el).addClass('in-range');
                    } else {
                        $(el).removeClass('in-range');
                    }

                });
            }

        },

        clickDate: function(e) {
            if (!$(e.target).hasClass('available')) {
                e.target = $(e.target).parent();
                if (!$(e.target).hasClass('available')) {
                    return;
                }
            }

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            if (this.startDate == null) {
                this.setStartDate(date.clone());
            } else if (this.endDate || date.isBefore(this.startDate, 'day')) { //picking start
                this.endDate = null;
                this.setStartDate(date.clone());
            } else if (!this.endDate && date.isBefore(this.startDate)) {
                this.setEndDate(this.startDate.clone());
            } else {
                this.setEndDate(date.clone());
            }

            this.updateView();

            //This is to cancel the blur event handler if the mouse was in one of the inputs
            e.stopPropagation();

        },
        
        changeStartTime: function (e) {
            if ($(e.target).is(':disabled')) {
                return;
            }
            
            this.setStartTime($(e.target).val());
            this.updateView();
            e.stopPropagation();
        }, 
        
        changeEndTime: function (e) {
            if ($(e.target).is(':disabled')) {
                return;
            }
            
            this.setEndTime($(e.target).val());
            this.updateView();
            e.stopPropagation();
        },
        
        clickApply: function(e) {
            this.updateElement();
            this.hide();
            this.element.trigger('apply.daterangepicker', this);
        },

        clickCancel: function(e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.startTime = this.oldStartTime;
            this.endTime = this.oldEndTime;
            this.maxDate = false;
            this.updateElement();
            this.hide();
            this.element.trigger('cancel.daterangepicker', this);
        },
        
        clickClear: function (e) {
            this.startDate = null;
            this.endDate = null;
            this.startTime = null;
            this.endTime = null;
            this.oldStartDate = null;
            this.oldEndDate = null;
            this.oldStartTime = null
            this.oldEndTime = null;
            this.maxDate = false;
            this.updateElement();
            this.updateView();
            
            this.element.trigger('clear.daterangepicker', this);
        },

        monthOrYearChanged: function(e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.calendar.'+leftOrRight);

            // Month must be Number for new moment versions
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();

            if (!isLeft) {
                if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                    month = this.startDate.month();
                    year = this.startDate.year();
                }
            }

            if (this.minDate) {
                if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                    month = this.minDate.month();
                    year = this.minDate.year();
                }
            }

            if (this.maxDate) {
                if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                    month = this.maxDate.month();
                    year = this.maxDate.year();
                }
            }

            if (isLeft) {
                this.leftCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
            } else {
                this.rightCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
            }
            this.updateCalendars();
        },

        keydown: function(e) {
            //hide on tab or enter
            if ((e.keyCode === 9) || (e.keyCode === 13)) {
                this.hide();
            }
        },
        
        getJsonData: function () {
            if (this.startDate == null || this.startTime == null || this.endDate == null || this.endTime == null) {
                return;
            }
            
            return {
                start: {
                    date: this.startDate.format(this.locale.format), 
                    time: this.startTime
                }, 
                end: {
                    date: this.endDate.format(this.locale.format),
                    time: this.endTime
                }
            };
        },
        
        getStartDateTime: function () {
            if (this.startDate == null || this.startTime == null ) {
                return null
            }
            
            return this.startDate.format(this.locale.format) + ' ' + this.startTime;
        },
        
        getEndDateTime: function () {
            if (this.endDate == null || this.endTime == null ) {
                return null
            }
            
            return this.endDate.format(this.locale.format) + ' ' + this.endTime;
        },

        updateElement: function() {
            if (this.element.is('input')) {
                var oldval = this.element.val();
                var newval = JSON.stringify(this.getJsonData());
                
                if (typeof newval === 'string') {
                    this.element.val(newval);
                } else {
                    this.element.val('');
                }
                
                if (oldval != this.element.val()) {
                    this.element.trigger('change');   
                }
                
                this.updateWrapper();
            }
        },
        
        updateWrapper: function () {
            if (this.wrapper) {
                if (this.startDate == null || this.startTime == null || this.endDate == null || this.endTime == null) {
                    this.wrapper.find('.placeholder').show();
                    this.wrapper.find('.preview').hide();
                } else {
                    this.wrapper.find('.placeholder').hide();
                    this.wrapper.find('.preview').show();
                    this.wrapper.find('.start .date').text(this.startDate.format(this.locale.previewFormat));
                    this.wrapper.find('.start .time').text(this.timeList[this.startTime]);

                    this.wrapper.find('.end .date').text(this.endDate.format(this.locale.previewFormat));
                    this.wrapper.find('.end .time').text(this.timeList[this.endTime]);
                }
            }
        },

        checkTimeInTimelist: function (time) {
            if (typeof time !== 'string') {
                return false;
            }
            
            if (this.timeList == null) {
                return false;
            }
            
            if (this.timeList[time]) {
                return true;
            }
            
            return false;
        },
        
        checkAvailableDate: function (date) {
            if (this.disabledDates && this.disabledDates[date.clone().format('YYYY-MM-DD')]) {             
                for (i in this.timeList) {
                    if (this.checkAvailableTime(date, i) == true) {
                        return {
                            available: false,
                            fullDay: false
                        };
                    }
                }
                
                return {
                    available: false,
                    fullDay: true
                };
            }
            
            return {
                available: true,
                fullDay: false
            };
        },
        
        checkAvailableTime: function (date, time) {
            if (this.checkTimeInTimelist(time) === false) {
                return false;
            }
            
            if (!(date instanceof moment)) {
                return false;
            }

            var newDate = moment(date.clone().format('YYYY-MM-DD') + ' ' + time);
            
            if (this.minDate instanceof moment) {
                if (newDate.isSameOrAfter(this.minDate, 'second') === false) {
                    return false;
                }
            }
            
            if (this.maxDate instanceof moment) {
                if (newDate.isSameOrBefore(this.maxDate, 'second') === false) {
                    return false;
                }
            }
            
            if (this.disabledDates && this.disabledDates[date.clone().format('YYYY-MM-DD')]) {
                var disabled = this.disabledDates[date.clone().format('YYYY-MM-DD')];
                
                if (disabled.time.indexOf(time) != -1) {
                    return false;
                }
            }
            
            return true;
        },

        setDisabledDates: function (data) {
            if (!this.disabledDates) {
                this.disabledDates = [];
            }
            
            for (i in data.response.models) {
                var model = data.response.models[i];
                
                for (j in model.dates) {
                    var date = model.dates[j];
                    
                    if (!this.disabledDates[date.date]) {
                        this.disabledDates[date.date] = {
                            date: moment(date.date),
                            time: date.time
                        };
                    } else {
                        var disabled = this.disabledDates[date.date];
                        for (k in date.time) {
                            if (disabled.time.indexOf(date.time[k]) == -1) {
                                disabled.time.push(date.time[k]);
                            }
                        }
                    }
                }
            }
            
            this.updateCalendars();
        },

        loadDisabledDates: function () {
            if (this.disabledSourceUrl === false) {
                return;
            } 
            
            var key, data, self = this;
            
            if (this.singleDatePicker === true) {
                data = {
                    start: this.leftCalendar.calendar.startDay.clone().format('YYYY-MM-DD'),
                    end:   this.leftCalendar.calendar.endDay.clone().format('YYYY-MM-DD')
                };
                key = data.start + '_' + data.end;
                
            } else {
                data = {
                    start: this.leftCalendar.calendar.startDay.clone().format('YYYY-MM-DD'),
                    end:   this.rightCalendar.calendar.endDay.clone().format('YYYY-MM-DD')
                };
                key = data.start + '_' + data.end;
            }
            
            if (this.disabledDatesLoaded && this.disabledDatesLoaded[key]) {
                return;
            }
            
            $.ajax({
                url: self.disabledSourceUrl,
                data: data,
                type: 'GET',
                dataType: 'JSON',
                context: this,
                success: function (response) {
                    if (!self.disabledDatesLoaded) {
                        self.disabledDatesLoaded = [];
                    } 
                    
                    self.disabledDatesLoaded[key] = true;
                    self.setDisabledDates(response);
                }
            });
        },

        remove: function() {
            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData();
        }
    };

    $.fn.daterangepicker = function(options, callback) {
        this.each(function() {
            var el = $(this);
            if (el.data('daterangepicker'))
                el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, options, callback));
        });
        return this;
    };

    return DateRangePicker;

}));
