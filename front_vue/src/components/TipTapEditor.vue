<template>
  <section>
    <editor-menu-bubble
      class="menububble"
      :editor="editor"
      @hide="hideLinkMenu"
      v-slot="{ commands, isActive, getMarkAttrs, menu }"
    >
      <div
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >
        <form
          class="menububble__form"
          v-if="linkMenuIsActive"
          @submit.prevent="setLinkUrl(commands.link, linkUrl)"
        >
          <input
            class="menububble__input"
            type="text"
            v-model="linkUrl"
            placeholder="https://"
            ref="linkInput"
            @keydown.esc="hideLinkMenu"
          />
          <button
            class="menububble__button"
            @click="setLinkUrl(commands.link, null)"
            type="button"
          >
            <fai icon="cut" />
          </button>
        </form>
        <template v-else>
          <button
            class="menububble__button"
            @click="showLinkMenu(getMarkAttrs('link'))"
            :class="{ 'is-active': isActive.link() }"
          >
            <span>{{ isActive.link() ? 'Update Link' : 'Add Link' }}</span>
            <fai icon="link" />
          </button>
        </template>
      </div>
    </editor-menu-bubble>

    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click.prevent="commands.bold"
        >
          <fai icon="bold" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click.prevent="commands.italic"
        >
          <fai icon="italic" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click.prevent="commands.strike"
        >
          <fai icon="strikethrough" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click.prevent="commands.underline"
        >
          <fai icon="underline" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click.prevent="commands.code"
        >
          <fai icon="code" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click.prevent="commands.paragraph"
        >
          <fai icon="paragraph" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click.prevent="commands.heading({ level: 1 })"
        >
          <i class="fa">H1</i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click.prevent="commands.heading({ level: 2 })"
        >
          <i class="fa">H2</i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click.prevent="commands.heading({ level: 3 })"
        >
          <i class="fa">H3</i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click.prevent="commands.bullet_list"
        >
          <fai icon="list-ul" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click.prevent="commands.ordered_list"
        >
          <fai icon="list-ol" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click.prevent="commands.blockquote"
        >
          <fai icon="quote-right" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click.prevent="commands.code_block"
        >
          <fai icon="code" />
        </button>

        <button
          class="menubar__button"
          @click.prevent="commands.horizontal_rule"
        >
          <fai icon="grip-lines" />
        </button>

        <button class="menubar__button" @click.prevent="commands.undo">
          <fai icon="undo" />
        </button>

        <button class="menubar__button" @click.prevent="commands.redo">
          <fai icon="redo" />
        </button>
        <button
          class="menubar__button"
          @click.prevent="showImagePrompt(commands.image)"
        >
          <fai icon="image" />
        </button>
      </div>
    </editor-menu-bar>
    <editor-content class="editor__content" :editor="editor" />
    <!-- <br>
          <br>
          {{json}}
          <br>
          {{html}} -->
  </section>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  HorizontalRule,
  Image
} from 'tiptap-extensions'
export default {
  props: ['text'],
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble
  },
  data() {
    return {
      linkUrl: null,
      linkMenuIsActive: false,
      json: null,
      html: null,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new Link(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new HorizontalRule()
        ],
        content: this.text,
        onUpdate: ({ getJSON, getHTML }) => {
          this.$emit('editorChanged', getHTML())
          this.json = getJSON()
          this.html = getHTML()
        }
      })
    }
  },
  methods: {
    beforeDestroy() {
      this.editor.destroy()
    },
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu() {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl(command, url) {
      command({ href: url })
      this.hideLinkMenu()
      this.editor.focus()
    },
    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    }
  }
}
</script>
