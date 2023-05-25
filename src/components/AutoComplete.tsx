import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import {
   Autocomplete,
   FlatDropdown,
   ModalDropdown,
 } from "@telenko/react-native-paper-autocomplete";

export function AutoComplete({disciplines, skill, setSkills}:any) {
      const [selectedIds, setIds] = useState([]);
      return 
        <Autocomplete
          multiple
          value={skill}
          onChange={setSkills}
          options={disciplines}
        />      
}