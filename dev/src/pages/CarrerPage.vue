<template>
  <div class="career-page">
    <main>
      <div class="left-section">
        <BlockComponent class="profile-block">
          <UserInfoComponent :currentUserId="1"/>
        </BlockComponent>  

        <BlockComponent class="achievements-section">
          <div class="vertical-flex">
            <span class="t14">Достижения</span>
            <AchievementComponent :currentUserId="1"/>
          </div>
        </BlockComponent>  
        
        <BlockComponent class="statistics-section">
            <UserStatisticsComponent :currentUserId="1"/>
        </BlockComponent>  
      </div>

      <div class="right-section">
        <b class="t32">Карьера</b>

        <div class="right-content">
          <div class="description-list">
            <div class="description-list-item">
              <span class="t14" >Ваш карьерный путь</span>
              <div style="align-content: center;">
                <img src="@/assets/INFO.png" alt="INFO">
                <TooltipComponent>
                  <span>Здесь будет отображаться ваша карьера, а так же, кем вы можете стать </span>
                </TooltipComponent>
              </div>
            </div>
            <BlockComponent class="career-path-block">
              <div class="vertical-flex">
                <span></span>
              </div>
            </BlockComponent>  
          </div>

          <div class="right-lower-section">
            <div class="description-list lower-description-list">
              <div class="description-list-item">
                <span class="t14" >Мои мероприятия</span>
                <div style="align-content: center;">
                <img src="@/assets/INFO.png" alt="INFO">
                <TooltipComponent>
                  <span>Мероприятия, которые вам сейчас доступны</span>
                </TooltipComponent>
              </div>
              </div>
              <span>Галочку с текстом</span>
              <BlockComponent variant="grey" class="event-section lower-block">
                <div class="vertical-flex">
                  <span>Мероприятие</span>
                </div>
              </BlockComponent>  
              <BlockComponent variant="grey" class="event-section lower-block">
                <div class="vertical-flex">
                  <span>Мероприятие</span>
                </div>
              </BlockComponent>  
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
              <AttestationComponent :currentUserId="1" :showAttestationsHistory="showAttestationsHistory"/>   
            </div> 
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import TooltipComponent from '@/components/TooltipComponent.vue'
import AchievementComponent from '@/components/AchievementComponent.vue'
import BlockComponent from '@/components/BlockComponent.vue'
import UserInfoComponent from '@/components/UserInfoComponent.vue'
import UserStatisticsComponent from '@/components/UserStatisticsComponent.vue'
import AttestationComponent from '@/components/AttestationComponent.vue'
import Toggler from '@/components/Toggler.vue'


export default {
  components: { BlockComponent, AchievementComponent, TooltipComponent, UserInfoComponent, UserStatisticsComponent, AttestationComponent, Toggler },

  data() {
    return {
      showAttestationsHistory: false // Начальное состояние чекбокса (скрыто)
    };
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.career-page {
  padding-block: 130px;
  text-align: left;


  main {
    padding-inline: 160px;
    display: flex;
    gap: 50px;
    justify-content: center;

    @media (max-width: 1450px) {
      flex-direction: column;
      align-items: center;
    }

    @media (max-width: 1000px) {
      padding-inline: 60px;
    }
  }

  .left-section {
    display: flex;
    width: 335px;
    flex-direction: column;
    gap: 14px;

    @media (max-width: 1450px) {
      width: 60%;
    }

    @media (max-width: 1000px) {
      width: 100%;
    }
  }

  .right-section {
    display: flex;
    flex-direction: column;
    gap: 50px;
    
    @media (max-width: 1450px) {
      width: 100%;
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
    flex-direction: column;
    gap: 30px;
    width: 100%;
  }

  .right-lower-section {
    display: flex;
    gap: 30px;

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
    min-width: 400px;
    
    @media (max-width: 1450px) {
      width: 60%;
      min-width: 300px;
    }
    
    @media (max-width: 1000px) {
      width: 100%;
      min-width: 200px;
    }
  }

  .description-list-item {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
    
  .lower-description-list {
    width: 50%;
    box-sizing: border-box; /* Указываем отступы и границы в размер элемента */

    @media (max-width: 1450px) {
      width: 100%;
    }
  }
}
</style>