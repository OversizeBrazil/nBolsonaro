(function () {
  //nBolsonaro
  var self = {
    nBolsonaroImgs: [
      "https://www.cartacapital.com.br/wp-content/uploads/2021/01/Bolsonaro-Impeachment-1.jpg",
      "https://imagenes.elpais.com/resizer/v2/H3AY7RTIIUQWF4X7BMMUDK4SBY.jpg?auth=34917644bf0f696fcb4d07929be883a779f7be4f0949b249b88ddd0f4bea5ade&width=414",
      "https://imagens.ebc.com.br/_bY4DYdwYKEJoPgTc-PZ3K2xzPA=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/pronunciamento_do_presidente_jair_bolsonaro20200907_0550.jpg",
      "https://nexo-uploads-beta.s3.amazonaws.com/wp-content/uploads/2023/11/29124036/2022-05-26-POLITICA-BOLSONARO-ITAMARATY-BIDEN_binary_290348-scaled.jpg",
      "https://www.hrw.org/sites/default/files/styles/embed_xxl/public/media_2021/08/202108Americas_Brazil_bolsonaro_block.jpg",
      "https://imagenes.elpais.com/resizer/v2/7XAYMNZ56VHQ3EP3L6LVO6CL7M.jpg?auth=96bb3ec224478c859117cebcd701c8ec805e9204abc77efdb2c65df7898a0b08&width=414",
      
      "https://www.cartacapital.com.br/wp-content/uploads/2025/09/54409368261_d52d9bcef5_k-1024x683.jpg",
      "https://f.i.uol.com.br/fotografia/2018/10/28/15407768675bd663a363789_1540776867_3x2_md.jpg",

      "https://www.plural.jor.br/wp-content/uploads/2019/03/bolsonaro-jovem-ed-1.jpg?wpId=18200",
      "https://uploads.metroimg.com/wp-content/uploads/2021/12/17174636/bolsonaro-michael.jpg",

      "https://www.moneytimes.com.br/uploads/2018/10/bolsonaro-amor.jpg",
      "https://www.diariodocentrodomundo.com.br/wp-content/uploads/2018/11/bolsonaro-9-1200x675.jpg",

      "https://img1.migalhas.uol.com.br/gf_base/empresas/MIGA/imagens/9B17DB3B675E7C5806B43E1FDD9ADE251697_bolsonaro.jpg",
      "https://linkezine.com.br/wp-content/uploads/2025/08/bolsonaro.gif",
      "https://static.poder360.com.br/2019/03/bolsonaro-no-datena.gif",
      "https://static.poder360.com.br/2020/11/bolsonaro-twitter-meme-18-nov.gif",
      "https://www.estadao.com.br/resizer/v2/https%3A%2F%2Fd32dgtrnmhd45e.cloudfront.net%2F08-05-2025%2Ft_fe3a255d68e240b7beb7ab424c760296_name_file_960x540_1600_v4_.jpg?quality=80&auth=46e5ce870235145042da96b2b2708b1ad7d717c0f02fae072b918d0f8b78eaff&width=520&height=292&smart=true",
      "https://images.vrt.be/vrtnws_web/2023/01/09/ec9b3a9c-902c-11ed-b07d-02b7b76bf47f.jpg?width=900&height=506",
      "https://images.jota.info/wp-content/uploads/2025/08/jair-bolsonaro-exame-moraes.jpg",
      "https://storage.googleapis.com/br_mynews_site/2025/06/6af3557b-54578021126_04944129cd_k.jpg",
      "https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/content-assets/images/20250621_AMP002.jpg",
      "https://istoedinheiro.com.br/wp-content/uploads/sites/17/Reuters_Direct_Media/BrazilOnlineReportTopNews/tagreuters.com2023binary_LYNXMPEJ03098-BASEIMAGE.jpg",
      "https://midias.correio24horas.com.br/2025/07/24/jair-bolsonaro-chora-em-igreja-2828783-article.webp",
      "https://pbs.twimg.com/media/DqoLq_ZX0AABSAm.jpg",
      "https://i.ytimg.com/vi/6sow6kb_2Hk/maxresdefault.jpg",
      "https://classic.exame.com/wp-content/uploads/2019/03/bolsonaro.gif",
    ],
    // Helper to get random image
    getRandomImage: function() {
      return self.nBolsonaroImgs[Math.floor(Math.random() * self.nBolsonaroImgs.length)];
    },

    shouldReplace: function() {
        return Math.random() * 100 < self.probability;
    },

    replaceImage: function (item) {
      //Skip if image is already replaced
      if (self.nBolsonaroImgs.includes(item.src)) return;

      // Check probability
      if (!self.shouldReplace()) return;

      var h = item.clientHeight;
      var w = item.clientWidth;

      //If image loaded and has dimensions
      if (h > 0 && w > 0) {
        //Replace
        item.style.width = w + "px";
        item.style.height = h + "px";
        item.src = self.getRandomImage();
      } else {
        //Replace when loaded
        //Avoid adding multiple listeners
        if (!item.dataset.nBolsonaroListening) {
            item.dataset.nBolsonaroListening = "true";
            item.addEventListener("load", function () {
              //Check again
              if (self.nBolsonaroImgs.includes(item.src)) return;
              
              // Check probability again for late loaded images? 
              // Maybe not, to be consistent. But let's keep it simple.
              if (!self.shouldReplace()) return;

              var h = item.clientHeight;
              var w = item.clientWidth;
              if (h > 0 && w > 0) {
                item.style.width = w + "px";
                item.style.height = h + "px";
                item.src = self.getRandomImage();
              }
            }, { once: true });
        }
      }
    },

    observe: function() {
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(function(node) {
              if (node.nodeType === 1) { // ELEMENT_NODE
                if (node.tagName === 'IMG') {
                  self.replaceImage(node);
                }
                // Also check for images inside the added node
                if (node.querySelectorAll) {
                    var imgs = node.querySelectorAll("img");
                    imgs.forEach(function(img) {
                        self.replaceImage(img);
                    });
                }
              }
            });
          } else if (mutation.type === 'attributes') {
            if (mutation.target.tagName === 'IMG') {
              self.replaceImage(mutation.target);
            }
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src']
      });
    },

    init: function() {
      // Load settings
      chrome.storage.sync.get({
        enabled: true,
        customImages: '',
        probability: 100,
        siteMode: 'all',
        allowedSites: ''
      }, function(items) {
        if (!items.enabled) return;

        // Check site filter
        if (items.siteMode === 'specific') {
            var currentHost = window.location.hostname;
            var allowed = false;
            if (items.allowedSites) {
                var sites = items.allowedSites.split('\n').map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
                for (var i = 0; i < sites.length; i++) {
                    if (currentHost.includes(sites[i])) {
                        allowed = true;
                        break;
                    }
                }
            }
            if (!allowed) return;
        }

        self.probability = items.probability;

        // Add custom images if any
        if (items.customImages) {
          var customList = items.customImages.split('\n').map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
          self.nBolsonaroImgs = self.nBolsonaroImgs.concat(customList);
        }

        //Initial replace
        var imgs = document.querySelectorAll("img");
        imgs.forEach(function (item) {
          self.replaceImage(item);
        });
        
        //Start observing
        self.observe();
      });
    }
  };

  //Run on ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", self.init);
  } else {
    self.init();
  }
})();
