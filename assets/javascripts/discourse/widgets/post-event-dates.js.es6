import RawHtml from "discourse/widgets/raw-html";
import { iconNode } from "discourse-common/lib/icon-library";
import { h } from "virtual-dom";
import { createWidget } from "discourse/widgets/widget";

export default createWidget("post-event-dates", {
  tagName: "section.post-event-dates",

  showAllParticipatingInvitees(postId) {
    this.sendWidgetAction("showAllInvitees", {
      postId,
      title: "title_participated",
      extraClass: "participated"
    });
  },

  html(attrs) {
    const content = [
      iconNode("clock"),
      h("span.date", new RawHtml({ html: attrs.localDates }))
    ];

    if (attrs.postEvent.is_expired && attrs.postEvent.status !== "standalone") {
      let participants;
      const label = I18n.t("event.post_ui.participants", {
        count: attrs.postEvent.stats.going
      });
      if (attrs.postEvent.stats.going > 0) {
        participants = this.attach("link", {
          action: "showAllParticipatingInvitees",
          actionParam: attrs.postEvent.id,
          contents: () => label
        });
      } else {
        participants = label;
      }

      content.push(h("span.participants", [h("span", " - "), participants]));
    }

    return content;
  }
});
