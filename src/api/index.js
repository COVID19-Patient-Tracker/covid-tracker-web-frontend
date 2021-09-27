import axios from "axios";

const url = 'https://www.hpb.health.gov.lk/api/get-current-statistical'

export const fetchTotalData = async () => {
  
  try {
    const { data: { data:{local_total_cases,local_deaths,local_recovered,update_date_time,local_active_cases}} } = await axios.get(url);

    return {local_total_cases,local_deaths,local_recovered,update_date_time,local_active_cases};
  } catch (error) {
    
  }
};

export const fetchData = async () => {
  
  try {
    const { data: { data:{local_new_cases,local_new_deaths,update_date_time}} } = await axios.get(url);

    return {local_new_cases,local_new_deaths,update_date_time};
  } catch (error) {
    
  }
};