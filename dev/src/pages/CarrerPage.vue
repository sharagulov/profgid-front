<template>
  <div class="career-page">
    <main>
      <div class="left-section">
        <BlockComponent class="profile-block">
          <UserInfoComponent :user="user" />
        </BlockComponent>  

        <BlockComponent class="achievements-section">
          <div class="vertical-flex">
            <AchievementComponent />
          </div>
        </BlockComponent>  
        
        <BlockComponent class="statistics-section">
            <UserStatisticsComponent />
        </BlockComponent>  
      </div>

      <div class="right-section">
        <h1 >Карьера</h1>

        <div class="right-content">
          <div class="description-list">
            <div class="description-list-item">
              <span class="t14">Ваш карьерный путь</span>
              <div style="align-content: center;">
                <img src="@/assets/INFO.png" alt="INFO">
                <TooltipComponent>
                  <span>Здесь будет отображаться ваша карьера, а также, кем вы можете стать</span>
                </TooltipComponent>
              </div>
            </div>
            <RoadmapComponent/>
            <div style="margin-top: 20px" class="description-list-item">
              <span class="t14">Задания</span>
              <div style="align-content: center;">
                <img src="@/assets/INFO.png" alt="INFO">
                <TooltipComponent>
                  <span>Здесь будет отображаться ваша карьера, а также, кем вы можете стать</span>
                </TooltipComponent>
              </div>
            </div>
            <TasksComponent />
          </div>

          <div class="right-lower-section">
            <div class="description-list lower-description-list">
              <div class="description-list-item">
                <span class="t14">Мои мероприятия</span>
                <div style="align-content: center;">
                  <img src="@/assets/INFO.png" alt="INFO">
                  <TooltipComponent>
                    <span>Мероприятия, которые вам сейчас доступны</span>
                  </TooltipComponent>
                </div>
              </div>
              <span>Галочку с текстом</span>
              <EventComponent /> 
            </div>
            <div class="description-list lower-description-list">
              <div class="description-list-item">
                <span class="t14">Аттестации</span>
                <div style="align-content: center;">
                  <img src="@/assets/INFO.png" alt="INFO">
                  <TooltipComponent>
                    <span>Здесь отображаются курсы, которые вы прошли</span>
                  </TooltipComponent>
                </div>
              </div>      
              <Toggler v-model="showAttestationsHistory" />
              <AttestationComponent />   
            </div> 
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import TooltipComponent from '@/components/TooltipComponent.vue'
import AchievementComponent from '@/components/AchievementComponent.vue'
import BlockComponent from '@/components/BlockComponent.vue'
import UserInfoComponent from '@/components/UserInfoComponent.vue'
import UserStatisticsComponent from '@/components/UserStatisticsComponent.vue'
import AttestationComponent from '@/components/AttestationComponent.vue'
import EventComponent from '@/components/EventComponent.vue'
import EventItem from '@/components/EventItem.vue'
import Toggler from '@/components/Toggler.vue'
import RoadmapComponent from '@/components/RoadmapComponent.vue'
import TasksComponent from '@/components/TasksComponent.vue'

export default {
  components: {
    BlockComponent,
    AchievementComponent,
    TooltipComponent,
    UserInfoComponent,
    UserStatisticsComponent,
    AttestationComponent,
    Toggler,
    EventComponent,
    EventItem,
    RoadmapComponent,
    TasksComponent
  },

  setup() {
    const user = ref(null)
    const showAttestationsHistory = ref(false)
    const router = useRouter()

    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem('access_token')
        if (!accessToken) return

        const response = await fetch('http://profguide.leganyst.ru:61180/employee/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Ошибка при загрузке пользователя')
        const role = data.role || (data.user && data.user.role)


        if (role === 'hr' || role === 'admin') {
  router.replace({ name: 'HrPage' })
  return
}
        

        user.value = data
      } catch (error) {
        console.error('Ошибка загрузки пользователя:', error.message)
      }
    }

    onMounted(fetchUser)

    return {
      user,
      showAttestationsHistory
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.career-page {
  padding-block: 130px;
  text-align: left;

  main {
    padding-inline: 50px;
    display: flex;
    gap: 50px;
    justify-content: center;
    
    @media (max-width: 1450px) {
      flex-direction: column;
      align-items: center;
      padding-inline: 200px;
    }
    
    @media (max-width: 1000px) {
      padding-inline: 20px;
    }
  }
  
  .left-section {
    display: flex;
    width: 400px;
    flex-direction: column;
    gap: 14px;

    @media (max-width: 1450px) {
      width: 100%;
    }

    @media (max-width: 1000px) {
      width: 100%;
    }
  }

  .right-section {
    display: flex;
    flex-direction: column;
    gap: 50px;
    width: 100%;
    
    @media (max-width: 1450px) {
      align-items: center;
    }
  }
    
  .vertical-flex {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex: 1 0 0;
    align-self: stretch;
  }
    
  .info-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
  }
  
  .info-list-item {
    display: flex;
    align-items: center; 
    width: 100%;
  }
  
  .dotted-line {
    flex-grow: 1; 
    height: 1px;
    background-image: radial-gradient(circle, $low-gray 5px, transparent 5px);
    background-size: 5px 5px; 
    margin: 0 10px; 
  }

  .right-content {
    display: flex;
    flex-direction: row;
    gap: 30px;
    width: 100%;

    @media (max-width: 1450px) {
      flex-direction: column;
    }
  }

  .right-lower-section {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;

    @media (max-width: 1450px) {
      flex-direction: column;
    }

    .lower-block span {
      width: 100%;
      word-wrap: break-word;
    }
  }
    
  .description-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 350px;
    width: 100%;
    
    @media (max-width: 1450px) {
      min-width: 0px;
    }
  }

  .description-list-item {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
    
  .lower-description-list {
    width: 100%;
    box-sizing: border-box; 

    @media (max-width: 1450px) {
      width: 100%;
    }
  }
}
</style>
