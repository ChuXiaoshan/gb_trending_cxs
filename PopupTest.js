/**
 * Created by CxS on 2018/1/24 15:06
 */

import React, {Component} from 'react';
import {Text} from 'react-native';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger
} from 'react-native-popup-menu';

export default class PopupTest extends Component {
    render() {
        return <MenuProvider style={{flexDirection: 'column', padding: 30}}>
            <Text>Hello world!</Text>
            <Menu onSelect={value => alert(`Selected number: ${value}`)}>
                <MenuTrigger text='Select option'/>
                <MenuOptions>
                    <MenuOption value={1} text='One'/>
                    <MenuOption value={2}>
                        <Text style={{color: 'red'}}>Two</Text>
                    </MenuOption>
                    <MenuOption value={3} disabled={true} text='Three'/>
                </MenuOptions>
            </Menu>
        </MenuProvider>
    }
}

// const BasicExample = () => (
//     <MenuProvider style={{flexDirection: 'column', padding: 30}}>
//         <Text>Hello world!</Text>
//         <Menu onSelect={value => alert(`Selected number: ${value}`)}>
//             <MenuTrigger text='Select option'/>
//             <MenuOptions>
//                 <MenuOption value={1} text='One'/>
//                 <MenuOption value={2}>
//                     <Text style={{color: 'red'}}>Two</Text>
//                 </MenuOption>
//                 <MenuOption value={3} disabled={true} text='Three'/>
//             </MenuOptions>
//         </Menu>
//     </MenuProvider>
// );
//
// export default BasicExample;