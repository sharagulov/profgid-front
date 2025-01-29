Паша, [29.01.2025 20:59]
<template>
  <div class="career-page">
    <main>
      <div class="left-section">
        <BlockComponent class="profile-block">
          <div class="vertical-flex">
            <img src="@/assets/AVATAR.png" alt="LOGO_RED">
            <span>Петр Иванов</span>
            <div class="info-list">
              <div class="info-list-item" style="font-weight: bold;">
                <span>Должность</span>
                <div class="dotted-line"></div>
                <span>Слесарь</span>
              </div>
              <div class="info-list-item">
                <span>Разряд</span>
                <div class="dotted-line"></div>
                <span>3</span>
              </div>
              <div class="info-list-item">
                <span>В штате с</span>
                <div class="dotted-line"></div>
                <span>07.06.2014</span>
              </div>
            </div>
          </div>
        </BlockComponent>  

        <BlockComponent class="achievements-section">
          <div class="vertical-flex">
            <span>Достижения</span>
            <p>Тут повставлять картинки, в дискорде зипка есть</p>
          </div>
        </BlockComponent>  
        
        <BlockComponent class="statistics-section">
          <div class="vertical-flex">
            <span>Статистика</span>
            <div class="info-list">
              <div class="info-list-item" style="font-weight: bold;">
                <span>Пройденные тесты</span>
                <div class="dotted-line"></div>
                <span>8</span>
              </div>
              <div class="info-list-item">
                <span>Статьи</span>
                <div class="dotted-line"></div>
                <span>Доделать</span>
              </div>
            </div>
          </div>
        </BlockComponent>  
      </div>

      <div class="right-section">
        <span class="hc">Карьера</span>

        <div class="right-content">
          <div class="description-list">
            <div class="description-list-item">
              <span style="align-content: center;">Ваш карьерный путь</span>
              <img src="@/assets/INFO.png" alt="INFO">
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
                <span style="align-content: center;">Мои мероприятия</span>
                <img src="@/assets/INFO.png" alt="INFO">
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
                <span style="align-content: center;">Аттестация</span>
                <img src="@/assets/INFO.png" alt="INFO">
              </div>
              <span>Галочку с текстом</span>
              <BlockComponent variant="grey" class="certification-section lower-block">
                <div class="vertical-flex">
                  <span>Одна аттестация</span>
                </div>
              </BlockComponent>  
            </div> 
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import BlockComponent from '@/components/BlockComponent.vue'

export default {
  components: { BlockComponent },
}
</script>

<style lang="scss" scoped>
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
    width: 330px;
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
    background-image: radial-gradient(circle, #CCC 5px, transparent 5px);
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