import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { User } from 'app/_models/user';
import { AuthService } from 'app/_services/auth.service';
import { Utilities } from 'app/_helpers/utilities';
import { UserService } from 'app/_services/user.service';

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    collapse?: string;
    icontype: string;
    // icon: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/filemanager',
    title: 'File Manager',
    type: 'link',
    icontype: 'nc-icon nc-single-copy-04'
    },{
        path: '/dashboard',
        title: 'Dashboard (Example)',
        type: 'link',
        icontype: 'nc-icon nc-bank'
    },
    // {
    //     path: '/components',
    //     title: 'Components',
    //     type: 'sub',
    //     collapse: 'components',
    //     icontype: 'nc-icon nc-layout-11',
    //     children: [
    //         {path: 'buttons', title: 'Buttons', ab:'B'},
    //         {path: 'grid', title: 'Grid System', ab:'GS'},
    //         {path: 'panels', title: 'Panels', ab:'P'},
    //         {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
    //         {path: 'notifications', title: 'Notifications', ab:'N'},
    //         {path: 'icons', title: 'Icons', ab:'I'},
    //         {path: 'typography', title: 'Typography', ab:'T'}
    //     ]
    // },
    // {
    //     path: '/forms',
    //     title: 'Forms',
    //     type: 'sub',
    //     collapse: 'forms',
    //     icontype: 'nc-icon nc-ruler-pencil',
    //     children: [
    //         {path: 'regular', title: 'Regular Forms', ab:'RF'},
    //         {path: 'extended', title: 'Extended Forms', ab:'EF'},
    //         {path: 'validation', title: 'Validation Forms', ab:'VF'},
    //         {path: 'wizard', title: 'Wizard', ab:'W'}
    //     ]
    // },
    // {
    //     path: '/tables',
    //     title: 'Tables',
    //     type: 'sub',
    //     collapse: 'tables',
    //     icontype: 'nc-icon nc-single-copy-04',
    //     children: [
    //         {path: 'regular', title: 'Regular Tables', ab:'RT'},
    //         {path: 'extended', title: 'Extended Tables', ab:'ET'},
    //         {path: 'datatables.net', title: 'Datatables.net', ab:'DT'}
    //     ]
    // },{
    //     path: '/maps',
    //     title: 'Maps',
    //     type: 'sub',
    //     collapse: 'maps',
    //     icontype: 'nc-icon nc-pin-3',
    //     children: [
    //         {path: 'google', title: 'Google Maps', ab:'GM'},
    //         {path: 'fullscreen', title: 'Full Screen Map', ab:'FSM'},
    //         {path: 'vector', title: 'Vector Map', ab:'VM'}
    //     ]
    // },{
    //     path: '/widgets',
    //     title: 'Widgets',
    //     type: 'link',
    //     icontype: 'nc-icon nc-box'

    // },{
    //     path: '/charts',
    //     title: 'Charts',
    //     type: 'link',
    //     icontype: 'nc-icon nc-chart-bar-32'

    // },{
    //     path: '/calendar',
    //     title: 'Calendar',
    //     type: 'link',
    //     icontype: 'nc-icon nc-calendar-60'
    // },
    // {
    //     path: '/pages',
    //     title: 'Pages',
    //     collapse: 'pages',
    //     type: 'sub',
    //     icontype: 'nc-icon nc-book-bookmark',
    //     children: [
    //         {path: 'timeline', title: 'Timeline Page', ab:'T'},
    //         {path: 'user', title: 'User Page', ab:'UP'},
    //         {path: 'login', title: 'Login Page', ab:'LP'},
    //         {path: 'register', title: 'Register Page', ab:'RP'},
    //         {path: 'lock', title: 'Lock Screen Page', ab:'LSP'}
    //     ]
    // },
    {
        path: '/sitesettings',
        title: 'Site Settings',
        type: 'sub1',
        collapse: 'sitesettings',
        icontype: 'fa fa-gear',
        children: [
            {path: 'fmadmin', title: 'File Manager Admin', ab:'FMA'},
            {path: 'useradd', title: 'Add User', ab:'AU'}
        ]
    },
    {
        path: '/companysettings',
        title: 'Company Settings',
        type: 'sub2',
        collapse: 'companysettings',
        icontype: 'fa fa-gear',
        children: [
            {path: 'labeladmin', title: 'Label Admin', ab:'LA'}
        ]
    }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit, AfterViewInit {
    public menuItems: any[];
    photoUrl: string;
    fullName: string;
    user: User;
    userIsSuperAdmin: boolean;
    userIsCompanyAdmin: boolean;

    constructor(public  authService: AuthService) {}

    isNotMobileMenu(){
        if ( window.outerWidth > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.photoUrl = this.authService.currentUser.photoUrl;
        this.fullName = this.authService.fullName;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.userIsSuperAdmin = Utilities.userIsSuperAdmin();
        this.userIsCompanyAdmin = Utilities.userIsCompanyAdmin();
        this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    }
    ngAfterViewInit() {
    }
}
